
let url = 'https://pokeapi.co/api/v2/pokemon/';//https://pokeapi.co/api/v2/pokemon/?limit=${maxLoad}
let allPokemon = [];
let maxLoad = 10;
let minLoad = 1;


async function loadData(currentUrl) {
  let response = await fetch(currentUrl);
  currentPokemonJSON = await response.json(); //wandelt den response(Antwort) in ein JSON um
  return currentPokemonJSON;
}

async function init() {
  for (let j = minLoad; j <= maxLoad; j++) {
    let loadedPokemon = await loadData(`${url}${j}`);
    allPokemon.push(loadedPokemon);
  }
    loadPokedex();
}

async function loadPokedex() {
  for (let i = 0; i < allPokemon.length; i++) {
    document.getElementById('pokedex').innerHTML += cardsHTML(i);
  }
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('openedDetailCard').style.display = 'none';
}

function morePokemon() {
  document.getElementById('loadingScreen').style.display = 'flex';
  maxLoad = maxLoad + 5;
  document.getElementById('pokedex').innerHTML = ''; 
  allPokemon.length = 0;
  init();
}

function search(input) {
  document.getElementById('pokedex').innerHTML = '';
  for (let i = 0; i < allPokemon.length; i++) {
    let pokeName = allPokemon[i]['name'];
    if (pokeName.includes(input.toLowerCase())) {
      document.getElementById('pokedex').innerHTML += cardsHTML(i);
    }
  }
}

function cardsColor(i) {
  let type = allPokemon[i]['types']['0']['type']['name'];
  return type;
}

function typeRender(i) {
  let pokeTypes = allPokemon[i]['types'];
  let HTML = '';
  for (let j = 0; j <= pokeTypes.length - 1; j++) {
    let type = pokeTypes[j]['type']['name'];
    HTML += `
      <div class="type">${upperCase(type)}</div>
    `;
  }
  return HTML;
}

function showDetailCard(i) {
  let img = allPokemon[i]['sprites']["other"]["official-artwork"]["front_default"]
  let name = allPokemon[i]['name'];
  let id = allPokemon[i]['id']
  document.getElementById('openedDetailCard').style.display = 'flex';

  document.getElementById(`openedDetailCard`).innerHTML = DetailCardHTML(i,img, name, id);
  cardsColor(i);
  showSpecs(i);
}


function showSpecs(i) {
  let height = allPokemon[i]['height'];
  let weight = allPokemon[i]['weight'];
  let ability_1 = allPokemon[i]['abilities']['0']['ability']['name'];
  let ability_2 = allPokemon[i]['abilities']['1']['ability']['name'];

  document.getElementById('detailContent').innerHTML = '';
  document.getElementById('detailContent').innerHTML = specsHTML(height, weight, ability_1, ability_2)
}

function showStats(i) {
  let currentPokemon = allPokemon[i]['stats'];
  document.getElementById('detailContent').innerHTML = '';
  document.getElementById('detailContent').innerHTML = `<table id="statTable"></table>`;

  for (let y = 0; y < currentPokemon.length; y++) {
    let statName = upperCase(currentPokemon[y]['stat']['name']);
    let statNumber = currentPokemon[y]['base_stat'];
    document.getElementById('statTable').innerHTML += statsHTML(statName, statNumber);
  }
}

async function showEvo(i) {
  let response = await fetch(allPokemon[i]['species']['url']);
  currentPokemonJSON = await response.json();
  let EvoURL = await fetch(currentPokemonJSON['evolution_chain']['url']);
  EvoJSON = await EvoURL.json();

  let Evo_1Url = await fetch(EvoJSON['chain']['evolves_to']['0']['species']['url']);
  Evo_1JSON = await Evo_1Url.json();

  Evo_1Name = Evo_1JSON['name']
  Evo_1Img = Evo_1JSON['name']

  
  console.log('1', EvoJSON); //wieder löschen!!
  console.log('url', Evo_1JSON); //wieder löschen!!
  console.log('Evo', Evo_1Name); //wieder löschen!!
  document.getElementById('detailContent').innerHTML = '';
}

function showMoves(i) {
  document.getElementById('detailContent').innerHTML = '';
  document.getElementById('detailContent').innerHTML = `<div id="overallMovesDiv"></div>`;
  let moves = allPokemon[i]['moves'];
  for (let n = 0; n < moves.length; n++) {
    let currentMove = moves[n]['move']['name'];
    document.getElementById('overallMovesDiv').innerHTML += `<div class="movesDiv">${currentMove}</div>`;
  }
}

function nextPokemon(i) {
  i++;
  if (i >= allPokemon.length) {
    i = 0;
  }
  showDetailCard(i);
}

function previewPokemon(i) {
  i--;
  if (i < 0) {
    i = allPokemon.length - 1;
  }
  showDetailCard(i);
}

function correctedSpec(spec) {
  let result = spec / 10;
  let newSpec = JSON.stringify(result);
  newSpec = newSpec.replace('.', ',');
  return newSpec;
}

function closeDetailCard() {
  document.getElementById(`openedDetailCard`).innerHTML = '';
  document.getElementById('openedDetailCard').style.display = 'none';
}

function correctedId(id) {
  return id.toString().padStart(3, '0'); //3 stellt sicher das der String immer 3 Zeichen lang ist. 
}                                        //0 ist der Wert der angezeigt wird, wenn der String zu kurz ist

function upperCase(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}