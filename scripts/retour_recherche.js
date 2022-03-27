function afficheResultat(nameChamp){

    var champion = requestChampionInfoByName(nameChamp);
    
    var divRoleResultat = $(".role_resultat")
    var divNameResultat = $(".name_resultat")
    var divStatResultat = $(".stat_resultat")
    var divLoreResultat = $(".lore_resultat")

    ChampiontableauInfo.roles.forEach((tag) =>  {
        divRoleResultat.append($("<p>" + tag + "</p>"));
    });
    divNameResultat.prepend($("<h1>" + champion.name + "</h1>"));

    divNameResultat.append($("<p>" + champion.difficulty + "</p>"));

    divStatResultat.append($("<p>" + champion.stats.HP + "HP</p>"));
    divStatResultat.append($("<p>" + champion.stats.DMG + "HP</p>"));

    divLoreResultat.append($("<p>" + champion.lore + "HP</p>"));
}


function afficheCarte(){
    var champion = requestChampionInfoByName(nameChamp);
    var tableauInfo = getTemplateCarteInfo(cham_JSON_OBJ);
    // puis tout tes traitement
}