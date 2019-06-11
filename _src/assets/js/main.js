'use strict';

const start = document.querySelector('.start');
const input = document.querySelectorAll('.input');
const input4 = document.querySelector('#four_cards');
const input6 = document.querySelector('#six_cards');
const input8 = document.querySelector('#eight_cards');
let number = 4;
const list = document.querySelector('.cards_list');
const photoAdalab = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let savedNumber = localStorage.getItem('number');
let arrPair = [];
let finish = [];

if (savedNumber === null) {
  input4.setAttribute('checked', '');
  number = 4;
} else if (savedNumber === '4') {
  input4.setAttribute('checked', '');
  number = 4;
} else if (savedNumber === '6') {
  input6.setAttribute('checked', '');
  number = 6;
} else {
  input8.setAttribute('checked', '');
  number = 8;
}

function numberCards(event) {
  const gilty = event.currentTarget;
  number = gilty.value;
  localStorage.setItem('number', number);
}

function search () {
  list.innerHTML = '';
  const url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${number}.json`;
  fetch(url)
    .then (response => response.json())
    .then (data => {
      for (const result of data) {
        const pokemon = result.image;
        const pair = result.pair;
        const li = document.createElement('li');
        li.classList.add('item_pokemon');
        li.innerHTML = `<img class="pokemon_photo hidden" src="${pokemon}"><img class="adalab_photo" src="${photoAdalab}"><p class="pair_number hidden">${pair}</p>`;
        li.addEventListener('click', frontBack);
        list.appendChild(li);
      }
    });
}

function frontBack(event) {
  const li = event.currentTarget;
  const arrImg = li.querySelectorAll('img');
  for (const image of arrImg) {
    image.classList.toggle('hidden');
  }
  if (arrPair.includes(li)) {
    arrPair = [];
  } else {
    arrPair.push(li);
  }
  if (arrPair.length === 2) {
    game(arrPair);
    arrPair = [];
  }
}

function game(arrLi) {
  let arrNumbers = [];
  let photos = [];
  for (const li of arrLi) {
    const number = li.querySelector('.pair_number').innerHTML;
    arrNumbers.push(number);
    const photo = li.querySelector('.pokemon_photo');
    const photoGreen = li.querySelector('.adalab_photo');
    photos.push(photo, photoGreen);
    if (arrNumbers[0] === arrNumbers[1]) {
      finish.push(arrNumbers[0]);
      finish.push(arrNumbers[1]);
      for (const elem of arrLi) {
        elem.removeEventListener('click', frontBack);
      }
      for (const itemPhoto of photos) {
        if (itemPhoto.classList.contains('pokemon_photo')) {
          itemPhoto.classList.add('selected');
          endGame();
        }
      }
    } else if (arrNumbers[0] !== arrNumbers[1] && arrNumbers.length === 2) {
      setTimeout( () => {
        for (const itemPhoto of photos) {
          if (itemPhoto.classList.contains('adalab_photo')) {
            itemPhoto.classList.remove('hidden');
          } else {
            itemPhoto.classList.add('hidden');
          }
        }
      }, 1500);
    } else {
      continue;
    }
  }
}

function endGame () {
  if (finish.length === number) {
    alert('¡Has ganado!');
  } else if (finish.length === savedNumber){
    alert('¡Has ganado!');
  }
}

for (const inputItem of input) {
  inputItem.addEventListener('change', numberCards);
}

start.addEventListener('click', search);
