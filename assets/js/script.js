// access_token = 338148107599656
const searchInput = document.getElementById('search');
const heroContainer = document.querySelector('.display-hero-container');
const text = document.getElementById('text');

var heroName = '';

const getHeroName = (e) => {
  text.style.display = 'block';
  heroName = e.target.value;
  heroContainer.innerHTML = '';
  if (heroName.length == 0) {
    text.innerText = 'Search your favourite heroes / villians';
  } else if (heroName.length >= 3) {
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
        let imgUrl = hero.image.url;
        let name = hero.name;
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
        img.setAttribute('src', imgUrl);
        h2.innerText = name;
        a.appendChild(h2);
        div.appendChild(img);
        div.appendChild(a);
        div.appendChild(btn);

        //append all elements into hero container
        heroContainer.appendChild(div);
      }
    } else {
      text.innerText = 'Enter valid character name';
    }
  };
};

searchInput.addEventListener('keyup', getHeroName);
