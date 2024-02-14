
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
    //let currentPokemon = allPokemon[i];
    document.getElementById('pokedex').innerHTML += cardsHTML(i);
    cardsColor(i);
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

function morePokemon() {
  maxLoad = maxLoad + 1;
  document.getElementById('pokedex').innerHTML = ''; //läd alle cards neu -> anpassen!!
  loadPokedex();//eig init()
}

function cardsHTML(i) {
  let pokeName = allPokemon[i]['name'];
  let pokeId = allPokemon[i]['id']
  let pokeImg = allPokemon[i]['sprites']['other']['official-artwork']['front_default'];
  console.log('currentpoke', allPokemon[i]); //wieder löschen!!

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

  document.getElementById(`overallDetailCard`).innerHTML = `
  
      <div class="detailCard ${cardsColor([i])}">
      <div class="closeDetailCard" onclick="closeDetailCard()">X</div>
      <div class="cardTop">
        <h1>${upperCase(name)}</h1>
        <span>#${correctedId(id)}</span>
      </div>
      <div class="detailType">${typeRender(i)}</div>
      <div class="imgPositiion">
        <img class="detailImg" id="PkmDetailImg" src=${img} alt="Pokemon img">
      </div>
    </div>
    <div class="infoContainer">
      <div class="infoMenü">
        <span onclick="showSpecs(${i})">About</span>
        <span onclick="showStats(${i})">Base Stats</span>
        <span onclick="showEvo(${i})">Evolution</span>
        <span onclick="showMoves(${i})">Moves</span>
      </div>
      <div id="detailContent">
      </div>
    </div>
  `;
  cardsColor(i);
  showSpecs(i);
}

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

  let Evo_1Url = await fetch(EvoJSON['chain']['evolves_to']['0']['species']['url']);//
  Evo_1JSON = await Evo_1Url.json();

  Evo_1Name = Evo_1JSON['name']
  Evo_1Img = Evo_1JSON['name']

  console.log('1', EvoJSO); //wieder löschen!!
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

function correctedSpec(spec) {
  let result = spec / 10;
  let newSpec = JSON.stringify(result);
  newSpec = newSpec.replace('.', ',');
  return newSpec;
}

function closeDetailCard() {
  document.getElementById(`overallDetailCard`).innerHTML = '';
}

function correctedId(id) {
  return id.toString().padStart(3, '0'); //3 stellt sicher das der String immer 3 Zeichen lang ist. 
}                                        //0 ist der Wert der angezeigt wird, wenn der String zu kurz ist

function upperCase(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}