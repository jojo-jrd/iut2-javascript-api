function afficheReusltat(nameChamp){

    var champion = requestChampionInfoByName(nameChamp);
    // puis (1) ou (2)
    //(1)
    var tableauInfo = getTemplateResultatInfo(champion);
    //ou
    //(2)

    for (var i = 0; i < heroes.length; i++) {
      var myPara1 = document.getElementsByClassName("role_resultat").createElement('p');
      var myPara2 = document.getElementsByClassName("role_resultat").createElement('p');
      var myPara3 = document.getElementsByClassName("role_resultat").createElement('p');
      var myH1    = document.getElementsByClassName("name_resultat").createElement('h1');
      var myPara4 = document.getElementsByClassName("name_resultat").createElement('p');
      var myPara5 = document.getElementsByClassName("name_resultat").createElement('p');
      var myPara6 = document.getElementsByClassName("stat_resultat").createElement('p');
      var myPara7 = document.getElementsByClassName("stat_resultat").createElement('p');
      var myPara8 = document.getElementsByClassName("stat_resultat").createElement('p');
      var myPara9 = document.getElementsByClassName("lore_resultat").createElement('p');
      
  
  
      myPara1.textContent = 'Rôles';
      myPara2.textContent = champion[i].tags[0];
      myPara3.textContent = champion[i].tags[1];

      myH1.textContent = champion[i].name;
      myPara4.textContent = 'Difficulté';
      myPara5.textContent = champion[i].info.difficulty.value();

      myPara6.textContent = 'Stats';
      myPara7.textContent = champion[i].stats.hp.value() + 'HP';
      myPara8.textContent = champion[i].stats.attackdamage.value() + 'Dmg';

      myPara9.textContent = champion[i].spells.description;
  
      var superPowers = heroes[i].powers;
      for (var j = 0; j < superPowers.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = superPowers[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
  
      section.appendChild(myArticle);
    }
}


function afficheCarte(){
    var champion = requestChampionInfoByName(nameChamp);
    var tableauInfo = getTemplateCarteInfo(cham_JSON_OBJ);
    // puis tout tes traitement
}