
let url = 'https://pokeapi.co/api/v2/pokemon/';//https://pokeapi.co/api/v2/pokemon/?limit=${maxLoad}
let allPokemon = [];
let maxLoad = 6;
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
    console.log('currentpoke', allPokemon[i]);
    document.getElementById('pokedex').innerHTML += cardsHTML(i);
  }
}

function typeRender(i) {
  let pokeTypes = allPokemon[i]['types'];
  
  let HTML ='';
  for (let j = 0; j <= pokeTypes.length-1; j++) {
    let type = pokeTypes[j]['type']['name'];
    console.log('type', type);
    HTML += `
      <div class="type">${type}</div>
    `;
  }
  return HTML;
}

function morePokemon() {
  maxLoad = maxLoad + 3;
  document.getElementById('pokedex').innerHTML = ''; //läd alle cards neu -> anpassen!!
  loadPokedex();
}

function cardsHTML(i) {
  let pokeName = allPokemon[i]['name']; 
  let pokeId = allPokemon[i]['id']      
  let pokeImg = allPokemon[i]['sprites']['other']['official-artwork']['front_default'];

  return `        
    <div onclick="showDetailCard(${i})" class="card">
      <div class="cardTop">
        <h1>${upperCase(pokeName)}</h1>
        <span>#${correctedId(pokeId)}</span>
      </div>
      <div class="cardBottom">
        <div id="pokeTypes" class="cardType">${upperCase(typeRender(i))}</div>
        <img src=${pokeImg} alt="Pokemon img">
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

function correctedId(id) {
  return id.toString().padStart(3, '0'); //3 stellt sicher das der String immer 3 Zeichen lang ist. 
}                                        //0 ist der Wert der angezeigt wird, wenn der String zu kurz ist

function upperCase(letter) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}