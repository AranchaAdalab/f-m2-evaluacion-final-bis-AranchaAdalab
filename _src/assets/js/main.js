'use strict';

const start = document.querySelector('.start');
const input = document.querySelectorAll('.input');
let number = 4;
const list = document.querySelector('.cards_list');
const allPokemon = document.querySelectorAll('li');

function numberCards(event) {
  const gilty = event.currentTarget;
  number = gilty.value;
}

function search () {
  list.innerHTML = '';
  const url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${number}.json`;
  fetch(url)
    .then (response => response.json())
    .then (data => {
      for (const result of data) {
        const pokemon = result.image;
        list.innerHTML += `<li class="item_pokemon"><img class="pokemon_photo" src="${pokemon}"></li>`;
      }
    });
}

function frontBack(event) {
  const gilty = event.currentTarget;
  gilty.classList.toggle('back_card');
}

for (const inputItem of input) {
  inputItem.addEventListener('change', numberCards);
}

start.addEventListener('click', search);

for (const li of allPokemon) {
  li.addEventListener('click', frontBack);
}
