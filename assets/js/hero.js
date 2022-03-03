const contatiner = document.querySelector('.display-hero-details');
const imgContainer = document.getElementById('hero-img');
const statsContainer = document.getElementById('hero-stats');

//create element
const img = document.createElement('img');

const powerstatsDiv = document.createElement('div');
const bioDiv = document.createElement('div');
const appearanceDiv = document.createElement('div');
const connectionDiv = document.createElement('div');

const nameOfHero = document.createElement('h1');
const heading1 = document.createElement('h1');
const heading2 = document.createElement('h1');
const heading3 = document.createElement('h1');
const heading4 = document.createElement('h1');

//unordered list
const ul1 = document.createElement('ul');
const ul2 = document.createElement('ul');
const ul3 = document.createElement('ul');
const ul4 = document.createElement('ul');

//get id from session storage
if (localStorage.getItem('id')) {
  var heroID = localStorage.getItem('id');
  getHeroDetails(heroID);
}

function getHeroDetails(heroID) {
  //http request to get hero based on their id's
  const httpReq = new XMLHttpRequest();
  httpReq.open(
    'GET',
    `https://superheroapi.com/api.php/338148107599656/${heroID}`,
    true
  );
  httpReq.send();

  httpReq.onload = () => {
    const response = JSON.parse(httpReq.response);
    createElement(response);
  };
}

//hero stats
function setHeroStats(states, unorderedList) {
  //for every heroes states create list item and append to the unordered list
  for (let state in states) {
    if (state !== 'aliases') {
      const list = document.createElement('li');
      const p = document.createElement('p');
      const span = document.createElement('span');
      p.innerText = state;
      span.innerText = states[state];
      p.appendChild(span);
      list.appendChild(p);
      unorderedList.appendChild(list);
    }
  }
}

//appendChild function
function appendChildElement(parentNode, childNode) {
  parentNode.appendChild(childNode);
}

//setHeading for the hero stats
function setHeading(headingName, heading) {
  heading.innerText = headingName;
}

function createElement(response) {
  // destructuring the properties of response
  const { name, powerstats, biography, appearance, connections, image } =
    response;

  nameOfHero.innerText = name;
  nameOfHero.style.textAlign = 'center';

  img.setAttribute('src', image.url);
  appendChildElement(imgContainer, nameOfHero);
  appendChildElement(imgContainer, img);

  setHeroStats(powerstats, ul1);
  setHeading('Powerstats', heading1);
  appendChildElement(powerstatsDiv, heading1);
  appendChildElement(powerstatsDiv, ul1);

  setHeroStats(biography, ul2);
  setHeading('Biography', heading2);
  appendChildElement(bioDiv, heading2);
  appendChildElement(bioDiv, ul2);

  setHeroStats(appearance, ul3);
  setHeading('Appearance', heading3);
  appendChildElement(appearanceDiv, heading3);
  appendChildElement(appearanceDiv, ul3);

  setHeroStats(connections, ul4);
  setHeading('Connections', heading4);
  appendChildElement(connectionDiv, heading4);
  appendChildElement(connectionDiv, ul4);

  appendChildElement(statsContainer, powerstatsDiv);
  appendChildElement(statsContainer, bioDiv);
  appendChildElement(statsContainer, appearanceDiv);
  appendChildElement(statsContainer, connectionDiv);
}
