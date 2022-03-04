// access_token = 338148107599656
import './hero.js';
import './fav.js';

const searchInput = document.getElementById('search');
const heroContainer = document.querySelector('.display-hero-container');

const clearBtn = document.getElementById('clear-btn');
// const text = document.getElementById('text');

var heroName = '' || localStorage.getItem('name');

//for storing all heroids in the local storage to show in favourite page
var heroIds = [];

localStorage.removeItem('id');

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('name');
    window.location.reload();
  });
}

const getHeroName = (e) => {
  text.style.display = 'block';
  heroName = e.target.value;
  heroContainer.innerHTML = '';
  if (heroName.length == 0) {
    text.innerText = 'Search your favourite heroes / villians';
    localStorage.removeItem('name');
    clearBtn.style.display = 'none';
  } else if (heroName.length > 3) {
    localStorage.setItem('name', heroName);
    fetchHeroDetails(heroName);
  } else {
    text.innerText = 'Type atleast 3 characters';
  }
};

const fetchHeroDetails = (heroName) => {
  //http request
  const req = new XMLHttpRequest();
  req.open(
    'GET',
    `https://superheroapi.com/api.php/338148107599656/search/${heroName}`,
    true
  );
  req.send();
  req.onload = () => {
    let response = JSON.parse(req.response);
    if (response.results) {
      text.style.display = 'none';
      for (let hero of response.results) {
        const { image, name } = hero;

        //creating element
        let div = document.createElement('div');
        let img = document.createElement('img');
        let a = document.createElement('a');
        let h2 = document.createElement('h2');
        let btn = document.createElement('button');
        div.classList.add('hero-card');
        h2.classList.add('hero-name');
        btn.id = 'fav-btn';

        btn.innerText = 'Add to favourite';

        a.setAttribute('href', 'hero.html');
        img.setAttribute('src', image.url);
        h2.innerText = name;

        a.appendChild(h2);
        div.appendChild(img);
        div.appendChild(a);
        div.appendChild(btn);

        //storing the hero name in session strorage when clicking on the hero card;
        a.addEventListener('click', () => {
          localStorage.setItem('id', hero.id);
        });

        // adding favourites
        btn.addEventListener('click', () => {
          alert('added to favorites');
          if (!heroIds.includes(hero.id)) {
            heroIds.push(hero.id);
          }
          localStorage.setItem('ids', JSON.stringify(heroIds));
        });

        //append all elements into hero container
        heroContainer.appendChild(div);

        //show clear list btn
        clearBtn.style.display = 'block';
      }
    } else {
      text.innerText = 'Enter valid character name';
    }
  };
};

if (searchInput) {
  searchInput.addEventListener('keyup', getHeroName);
}

// if the local storage isn't empty show the list of heroes
if (heroName) {
  fetchHeroDetails(heroName);
}

//store all the ids from the local storage if present to hero-ids
if (localStorage.getItem('ids')) {
  var ids = localStorage.getItem('ids');
  heroIds = JSON.parse(ids);
}
