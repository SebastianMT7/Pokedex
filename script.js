
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
        document.getElementById('pokedex').innerHTML += cardsHTML(i);
  }
}

function typeRender(i) {
  let pokeTypes = allPokemon[i]['types'];  
  let HTML ='';
  for (let j = 0; j <= pokeTypes.length-1; j++) {
    let type = pokeTypes[j]['type']['name'];
    HTML += `
      <div class="type">${upperCase(type)}</div>
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
  console.log('currentpoke', allPokemon[i]);
  showDetailCard(0); //wieder löschen!!
  return `        
    <div onclick="showDetailCard(${i})" class="card">
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
  
      <div class="detailCard">
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
      </div>
      <div id="detailContent">
      </div>
    </div>
  `;
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

function showStats(i){
  document.getElementById('detailContent').innerHTML = '';
}

function showEvo(i){
  document.getElementById('detailContent').innerHTML = '';
}

function correctedSpec(spec){
  //document.getElementById('endSum').innerHTML = `${EndSum.toFixed(2).replace('.', ',')}€`;
  let newSpec = spec / 10;
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