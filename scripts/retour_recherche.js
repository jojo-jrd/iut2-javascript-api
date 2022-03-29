function afficheResultat(nameChamp){

    var champion = getTemplateCarteInfo(nameChamp);

    var secMainCarte = $(".main_sec");
    
    var divRoleResultat = $(".role_resultat");
    var divNameResultat = $(".name_resultat");
    var divStatResultat = $(".stat_resultat");
    var divLoreResultat = $(".lore_resultat");

    secMainCarte.style.backgroundimage = "\"" + champion.loadings[0].link + "\"";

    champion.roles.forEach((tag) =>  {
        divRoleResultat.append($("<p>" + tag + "</p>"));
    });
    divNameResultat.prepend($("<h1>" + champion.name + "</h1>"));

    divNameResultat.append($("<p>" + champion.difficulty + "</p>"));

    divStatResultat.append($("<p>" + champion.stats.HP + " HP</p>"));
    divStatResultat.append($("<p>" + champion.stats.DMG + " Dmg</p>"));

    divLoreResultat.append($("<p>" + champion.lore + "</p>"));
}


function afficheCarte(nameChamp){
    var champion = getTemplateCarteInfo(nameChamp);
    var secPrincipaleCarte = $(".carte_principale");
    var divTitreCarte      = $(".titre"           );
    var divRoleCarte       = $(".roles"           );
    var divStatCarte       = $(".stats"           );
    var divDiffCarte       = $(".difficult"       );
    var divSkinsCarte      = $(".skins"           );
    var divSpellsCarte     = $(".spells"          );
    var secPassifCarte     = $(".passif"          );
    var divLoreCarte       = $(".lore"            );
    

//SECTION carte_principale
secPrincipaleCarte.style.backgroundimage = "\"" + champion.loadings[0].link + "\"";
    //DIV titre
    divTitreCarte.append($("<h1>" + champion.name + "</h1>"))
    divTitreCarte.append($("<h4>" + champion.title + "</h4>"))
    
    //DIV roles
    champion.roles.forEach((tag) =>  {
        divRoleCarte.append($("<p>" + tag + "</p>"));
    });

    //DIV stats
    divStatCarte.append($("<p>HP : " + champion.HP + "</p>"));
    divStatCarte.append($("<p>Vitesse de déplacement : " + champion.MOVESPEED + "</p>"));
    divStatCarte.append($("<p>Armure : " + champion.ARMOR + "</p>"));
    divStatCarte.append($("<p>Rayon d'attaque : " + champion.RANGE + "</p>"));
    divStatCarte.append($("<p>Dégats d'attaque : " + champion.DMG + "</p>"));

    //DIV difficult
    divDiffCarte.append($("<p>Difficulté : " + champion.DIFFICULTY + "</p>"));
    divDiffCarte.append($("<p>Attaque : " + champion.ATK + "</p>"));
    divDiffCarte.append($("<p>Défense : " + champion.DEF + "</p>"));
    divDiffCarte.append($("<p>Magie : " + champion.MAG + "</p>"));

    //DIV skins
    champion.skins.forEach((skin) =>  {
        divSkinsCarte.append($("<div><img src=\"" 
        + skin.splashs.link 
        + "alt=\"\"><h3>" 
        + skin.splashs.name 
        + "</h3></div>"));
    });

    //DIV spells
    champion.spells.forEach((spell) =>  {
        divSpellsCarte.append($("<div><div><img src=\"" 
        + spell.link 
        + "alt=\"\"><h3>" 
        + spell.name 
        + "</h3></div><p>" 
        + spell.description 
        + "</p></div>"));
    });

    //SECTION passif
    champion.passive.forEach((passif) =>  {
        secPassifCarte.append($("<div><div><img src=\"" 
        + passif.link 
        + "alt=\"\"><h3>" 
        + spell.name 
        + "</h3></div><p>" 
        + spell.description 
        + "</p></div>"));
    });

    //DIV lore
    divLoreCarte.append($("<p>" + champion.lore + "</p>"))
}