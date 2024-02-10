async function init() {
    let [resp, err] = await resolve(fetch('bundesland.json')); //(fetch('bundesland.json')) ist hier das promis (p) und wird weitergegebn
    if (resp) {
        console.log('Fertig');
    } 
    
    if(err){
        console.error('Die Pokemon konnten nicht geladen werden.');
    }
}
//promis ist das was aus der APi geladen werden muss!!

async function resolve(p) {
    try {
        let response = await p;
        return [response, null];
    } catch (e) {
        return [null, e];
    }
}


async function renderPokemonCards(i) {
  let currentPokemon = await loadData(`${url}${i}`);

  console.log('pokemonJSON', currentPokemon);

  let pokeName = currentPokemon['name'];
  let pokeId = currentPokemon['id'];
  let pokeType = currentPokemon['types']['0']['type']['name']; //neue Funktion!!
  let pokeImg = currentPokemon['sprites']['front_default']

  
  document.getElementById('pokedex').innerHTML += cardsHTML(pokeName, pokeId, pokeType);
  document.getElementById(`PkmImg${pokeId}`).src = pokeImg;
  typeAmount(currentPokemon);
}

function correctedId(id) {
  return id.toString().padStart(3, '0'); //3 stellt sicher das der String immer 3 Zeichen lang ist. 
}                                        //0 ist der Wert der angezeigt wird, wenn der String zu kurz ist

function upperCase(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

function typeAmount (currentPokemon){
  let pokeTypes = currentPokemon['types'];
  for (let j = 0; j < pokeTypes.length; j++) {
    let type = type[j];
    
  }
}

function morePokemon() {
  maxLoad = maxLoad + 2; 
  document.getElementById('pokedex').innerHTML = ''; //läd alle cards neu -> anpassen!!
  loadPokedex();
}

function cardsHTML(pokeName, pokeId, pokeType) {
  return `        
    <div class="card" onclick="showDetailCard()">
      <div class="cardTop">
        <h1>${upperCase(pokeName)}</h1>
        <span class="Id">#${correctedId(pokeId)}</span>
      </div>
      <div class="cardBottom">
        <div class="cardType">
          <div class="type">${upperCase(pokeType)}</div>
          <div class="type">poison</div>
        </div>
        <img id="PkmImg${pokeId}" src=# alt="Pokemon img">
      </div>
    </div>
      `;
}


////////////////////////////////////////////////////////

let url = 'https://pokeapi.co/api/v2/pokemon/';//https://pokeapi.co/api/v2/pokemon/?limit=${maxLoad}
let pokemonData = [];
let maxLoad = 6;
let minLoad = 1;

let bgType = [
  { name: 'Normal', color: 'A8A878' },
  { name: 'Fire', color: 'F08030' },
  { name: 'Water', color: '6890F0' },
  { name: 'Grass', color: '78C850' },
  { name: 'Electric', color: 'F8D030' },
  { name: 'Ground', color: 'E0C068' },
  { name: 'Flying', color: 'A890F0' },
  { name: 'Rock', color: 'B8A038' },
  { name: 'Fighting', color: 'C03028' },
  { name: 'Psychic', color: 'F85888' },
  { name: 'Poison', color: 'A040A0' },
  { name: 'Bug', color: 'A8B820' },
  { name: 'Ice', color: '98D8D8' },
  { name: 'Ghost', color: '705898' },
  { name: 'Steel', color: 'B8B8D0' },
  { name: 'Dark', color: '705848' },
  { name: 'Dragon', color: '7038F8' },
  { name: 'Fairy', color: 'EE99AC' }
];

async function loadData(currentUrl) {
  let response = await fetch(currentUrl);
  currentPokemonJSON = await response.json(); //wandelt den response(Antwort) in ein JSON um
  return currentPokemonJSON;
}

function loadPokedex() {
  for (let i = minLoad; i <= maxLoad; i++) {
    renderPokemonCards(i);
  }
}

async function renderPokemonCards(i) {
  let currentPokemon = await loadData(`${url}${i}`);

  console.log('pokemonJSON', currentPokemon);

  let pokeImg = currentPokemon['sprites']["other"]["official-artwork"]["front_default"];

  document.getElementById('pokedex').innerHTML += cardsHTML(currentPokemon, i); 
  document.getElementById(`PkmImg${i}`).src = pokeImg;
  typeAmount(currentPokemon, i);
  ////document.getElementById(`card${i}`).onclick = showDetailCard(currentPokemon, i);

  showDetailCard(currentPokemon);  //wieder löschen!!!!!
}

function correctedId(id) {
  return id.toString().padStart(3, '0'); //3 stellt sicher das der String immer 3 Zeichen lang ist. 
}                                        //0 ist der Wert der angezeigt wird, wenn der String zu kurz ist

function upperCase(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

function typeAmount(currentPokemon, i) {
  let pokeTypes = currentPokemon['types'];
  for (let j = 0; j <= pokeTypes.length - 1; j++) {
    if (j == 0) {
      let type_1 = pokeTypes['0']['type']['name'];
      document.getElementById(`typ_1${i}`).innerHTML = `${upperCase(type_1)}`;
      document.getElementById(`typ_2${i}`).style.display = "none";
    } else {
      let type_1 = pokeTypes['0']['type']['name'];
      let type_2 = pokeTypes['1']['type']['name'];
      document.getElementById(`typ_2${i}`).style.display = "flex";
      document.getElementById(`typ_1${i}`).innerHTML = `${upperCase(type_1)}`;
      document.getElementById(`typ_2${i}`).innerHTML = `${upperCase(type_2)}`;
    }
  }
}

function morePokemon() {
  maxLoad = maxLoad + 3;
  document.getElementById('pokedex').innerHTML = ''; //läd alle cards neu -> anpassen!!
  loadPokedex();
}

function cardsHTML(currentPokemon, i) {
  let pokeName = currentPokemon['name']; //array kann nicht in einem template weiter gegeben werden
  let pokeId = currentPokemon['id']      //showDetailCard(${JSON.stringify(currentPokemon)}->wandelt array in text um->eher ungeeignet

  return `        
    <div onclick="showDetailCard(${currentPokemon}, i${i})" class="card">
      <div class="cardTop">
        <h1>${upperCase(pokeName)}</h1>
        <span>#${correctedId(pokeId)}</span>
      </div>
      <div class="cardBottom">
        <div class="cardType">
          <div id="typ_1${i}" class="type"></div>  
          <div id="typ_2${i}" class="type"></div>
        </div>
        <img id="PkmImg${i}" src=# alt="Pokemon img">
      </div>
    </div>
      `;
}

function showDetailCard(currentPokemon, name, id) {
  let img = currentPokemon['sprites']["other"]["official-artwork"]["front_default"]

  document.getElementById(`overallDetailCard`).innerHTML = `
  
      <div class="detailCard">
      <div class="closeDetailCard" onclick="closeDetailCard()">X</div>
      <div class="cardTop">
        <h1>${upperCase(name)}</h1>
        <span>#${correctedId(id)}</span>
      </div>
      <div class="detailType">
        <div id="typ_1${id}" class="type">Poison</div>
        <div id="typ_2${id}" class="type">Grass</div>
      </div>
      <div class="imgPositiion">
        <img class="detailImg" id="PkmDetailImg${id}" src=# alt="Pokemon img">
      </div>
    </div>
    <div class="infoContainer">
      <div class="infoMenü">
        <span onclick="showSpecs(${currentPokemon})">About</span>
        <span onclick="showStats(${currentPokemon})">Base Stats</span>
        <span onclick="showEvo(${currentPokemon})">Evolution</span>
      </div>
      <div id="detailContent">Test
      </div>
    </div>
  `;
  document.getElementById(`PkmDetailImg${id}`).src = img;
  typeAmount(currentPokemon, id);
}

function showSpecs(currentPokemon) {
  let height = currentPokemon['height'];
  let weight = currentPokemon['weight'];
  let ability_1 = currentPokemon['abilities']['0']['ability']['name'];
  let ability_2 = currentPokemon['abilities']['1']['ability']['name'];
  document.getElementById('detailContent').innerHTML = '';
  document.getElementById('detailContent').innerHTML = `
  
  <table>
    <tr>
      <td>Height</td>
     <td>${height}</td>
    </tr>
    <tr>
      <td>Weight</td>
      <td>${weight}</td>
    </tr>
    <tr>
      <td>Abilities</td>
     <td>${ability_1}, ${ability_2}</td>
    </tr>
  </table>
  
  `;

}

function closeDetailCard() {
  document.getElementById(`overallDetailCard`).innerHTML = '';
}