const url = 'https://superheroapi.com/api.php/338148107599656/';

const heroContainer = document.querySelector('.fav-hero-container');
const text = document.getElementById('fav-text');

var newArrayIds = [];

if (localStorage.getItem('ids') === '[]') {
  localStorage.removeItem('ids');
}

if (localStorage.getItem('ids')) {
  if (text !== null) text.style.display = 'none';
  let ids = localStorage.getItem('ids');
  newArrayIds = JSON.parse(ids);
  extractId(newArrayIds);
}

function httpResquest(id) {
  const httpReq = new XMLHttpRequest();
  httpReq.open('GET', url + id, true);
  httpReq.send();
  httpReq.onload = () => {
    let response = JSON.parse(httpReq.response);
    showFavorites(response);
  };
}

function extractId(newArrayIds) {
  for (let id of newArrayIds) {
    httpResquest(id);
  }
}

function appendChildElement(parentNode, childNode) {
  if (parentNode !== null) {
    parentNode.appendChild(childNode);
  }
}

function showFavorites(response) {
  const { image, name } = response;

  //creating element
  let div = document.createElement('div');
  let img = document.createElement('img');
  let a = document.createElement('a');
  let h2 = document.createElement('h2');
  let btn = document.createElement('button');
  div.classList.add('hero-card');
  h2.classList.add('hero-name');
  btn.id = 'fav-btn';

  btn.innerText = 'Remove';

  a.setAttribute('href', 'hero.html');
  img.setAttribute('src', image.url);
  h2.innerText = name;

  //removing favorites
  btn.addEventListener('click', () => {
    const id = response.id;

    //removing items from local storage;
    const ids = JSON.parse(localStorage.getItem('ids'));
    const index = ids.indexOf(id);
    ids.splice(index, 1);

    //set updated ids back into localstorage;
    localStorage.setItem('ids', JSON.stringify(ids));
    window.location.reload();
  });

  appendChildElement(a, h2);
  appendChildElement(div, img);
  appendChildElement(div, a);
  appendChildElement(div, btn);

  appendChildElement(heroContainer, div);
}

// the problem is in the local storage
// when ids == [];
