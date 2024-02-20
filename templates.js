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

  function DetailCardHTML(i,img, name, id){
    return`
        <div class="overallDetailCard">
            <div class="detailCard ${cardsColor([i])}">
            <div class="closeDetailCard" onclick="closeDetailCard()">X</div>
            <div class="cardTop">
                <h1>${upperCase(name)}</h1>
                <span>#${correctedId(id)}</span>
            </div>
            <div class="detailType">${typeRender(i)}
            </div>
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
  }

  function specsHTML(height, weight, ability_1, ability_2){
    return `  
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

  function statsHTML(name, number) {
    return ` 
      <td class="tdAbout">${name}</td>        
      <td id="specNumber"><label>${number}</label></td>
      <td>
        <progress max="200" value="${number}"></progress> 
      </td>   
     `;
  }