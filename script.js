
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
  maxLoad = maxLoad + 3;
  document.getElementById('pokedex').innerHTML = ''; //läd alle cards neu -> anpassen!!
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

function cardsHTML(i) {
  let pokeName = allPokemon[i]['name'];
  let pokeId = allPokemon[i]['id']
  let pokeImg = allPokemon[i]['sprites']['other']['official-artwork']['front_default'];

  return `        
    <div onclick="showDetailCard(${i})" class="card ${cardsColor([i])}">
      <div class="cardTop">
        <h1>${upperCase(pokeName)}</h1>
        <span>#${correctedId(pokeId)}</span>
      </div>
      <div class="cardBottom">
        <div id="pokeTypes" class="cardType">${typeRender(i)}</div>
        <img src=${pokeImg} alt="Pokemon img">
      </div>
    </div>
      `;
}

function showDetailCard(i) {
  let img = allPokemon[i]['sprites']["other"]["official-artwork"]["front_default"]
  let name = allPokemon[i]['name'];
  let id = allPokemon[i]['id']
  document.getElementById('openedDetailCard').style.display = 'flex';

  document.getElementById(`openedDetailCard`).innerHTML = `
  <div class="overallDetailCard">
      <div class="detailCard ${cardsColor([i])}">
      <div class="closeDetailCard" onclick="closeDetailCard()">X</div>
      <div class="cardTop">
        <h1>${upperCase(name)}</h1>
        <span>#${correctedId(id)}</span>
      </div>
      <div class="detailType">${typeRender(i)}</div>
      <div class="imgPositiion">
        <img class="arrowImg" onclick="previewPokemon(${i})" src=./img/arrow_left.png alt="arrow">
        <img class="detailImg" id="PkmDetailImg" src=${img} alt="Pokemon img">
        <img class="arrowImg" onclick="nextPokemon(${i})" src=./img/arrow_right.png alt="arrow">
      </div>
    </div>
    <div class="infoContainer">
      <div class="infoMenü">
        <span onclick="showSpecs(${i})">About</span>
        <span onclick="showStats(${i})">Base Stats</span>
        <span onclick="showMoves(${i})">Moves</span>
      </div>
      <div id="detailContent">
      </div>
    </div>
    </div>
  `;
  cardsColor(i);
  showSpecs(i);
}

//<span onclick="showEvo(${i})">Evolution</span>

function showSpecs(i) {
  let height = allPokemon[i]['height'];
  let weight = allPokemon[i]['weight'];
  let ability_1 = allPokemon[i]['abilities']['0']['ability']['name'];
  let ability_2 = allPokemon[i]['abilities']['1']['ability']['name'];

  document.getElementById('detailContent').innerHTML = '';
  document.getElementById('detailContent').innerHTML = `
  
  <table>
    <tr>
      <td class="tdAbout">Height</td>
     <td class="tdSpecs">${correctedSpec(height)}m</td>
    </tr>
    <tr>
      <td class="tdAbout">Weight</td>
      <td class="tdSpecs">${correctedSpec(weight)}kg</td>
    </tr>
    <tr>
      <td class="tdAbout">Abilities</td>
     <td class="tdSpecs">${upperCase(ability_1)}, ${upperCase(ability_2)}</td>
    </tr>
  </table>  
  `;
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

function statsHTML(name, number) {
  return ` 
    <td class="tdAbout">${name}</td>        
    <td id="specNumber"><label>${number}</label></td>
    <td>
      <progress max="200" value="${number}"></progress> 
    </td>   
   `;
  //max evtl auf 255 -> laut inet höchste base stat nummer
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


//let url = pokemonSpezies[0]['evolution_chain']['url'];
//<p>${responseAsJson['chain']['species']['name']}</p>

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