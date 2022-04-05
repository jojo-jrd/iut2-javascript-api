// =============================  CONSTANTES =================================
var NOM_CHAMPION;           // => contient la liste des noms de champions disponible
// ================================================================================

/**
 * Initialise par un appel à l'api la liste
 * de tout les noms de champion. Cette methods évite
 * les appels couteux trop fréquent.
 */
function initNomCHamp(){
    debug("Initialisation des nom de champion dans retour_recherche.js");
    requestChampionsList(NAME_ONLY).then((resp)=>{
        NOM_CHAMPION = resp;
        debug("Fin initialisation. NOM_CHAMPION=", [NOM_CHAMPION]);
        $("#nb-resultat").attr({
            "min":1,
            "max":NOM_CHAMPION.length
        });
    });
}

function afficheResultat(nameChamp){
    $("#bloc-resultats").empty();
    $("#bloc-gif-attente").css("display", "block");

    getTemplateResultatInfo(nameChamp).then((champion) => {
        
        $("#bloc-gif-attente").css("display", "none");


        
        // 1 - création d'une "resultat vide" et set d'un id unique (nom du champion):
        var temp = document.querySelector('#templateResultat');
        $(temp.content.querySelector(".main_sec")).attr({'id': nameChamp+"R"});
        var clone = document.importNode(temp.content, true);
        $("#bloc-resultats").append(clone);



        var divRoleResultat = document.querySelector('#'+nameChamp+'R .role_resultat');
        var divNameResultat = document.querySelector('#'+nameChamp+'R .name_resultat');
        var divStatResultat = document.querySelector('#'+nameChamp+'R .stat_resultat');
        var divLoreResultat = document.querySelector('#'+nameChamp+'R .lore_resultat');

        //SECTION main_sec
        $('#'+nameChamp+'R').css("background-image", "url(" + (champion.splashs[0]).link + ")");
        $('#'+nameChamp+'R').attr("onClick","clickResultat(\""+nameChamp+"\")");

        //DIV role_resultat
        champion.roles.forEach((tag) =>  {
            $(divRoleResultat).append($("<p>" + tag + "</p>"));
        });

        //DIV name_resultat
        $(divNameResultat).prepend($("<h1>" + champion.name       + "</h1>"));
        $(divNameResultat).append ($("<p>"  + champion.difficulty + "</p>" ));

        //DIV stat_resultat
        $(divStatResultat).append($("<p>" + champion.stats.HP  + " HP</p>" ));
        $(divStatResultat).append($("<p>" + champion.stats.DMG + " Dmg</p>"));

        //DIV lore_resultat
        $(divLoreResultat).append($("<p>" + champion.lore + "</p><span id=\"voir_plus\">Voir plus</span>"));
    });

}

function clickResultat(nomchamp){
    //var temp = document.querySelector('#templateResultat');
    afficheCarte(nomchamp);
    $('#bloc-resultats .main_sec').hide(); 
}

function enleverCarte(nameChamp){
    // supprime la carte
    var node = document.getElementById(nameChamp+'C');
    var parent = document.getElementById("bloc-resultats");
    parent.removeChild(node);
    
    // réaffiche les resultats
    $('#bloc-resultats .main_sec').show();  
}

function afficheCarte(nameChamp){

    getTemplateCarteInfo(nameChamp).then((champion) => {
        
        $("#bloc-gif-attente").css("display", "none");


        // 1 - création d'une "carte vide" et set d'un id unique (nom du champion):
        var temp = document.querySelector('#templateCarte');
        $(temp.content.querySelector(".carte_principale")).attr({'id': nameChamp+'C'});
        var clone = document.importNode(temp.content, true);
        $("#bloc-resultats").append(clone);


        var divTitreCarte      = document.querySelector('#'+nameChamp+'C .titre'    );
        var divRoleCarte       = document.querySelector('#'+nameChamp+'C .roles'    );
        var divStatCarte       = document.querySelector('#'+nameChamp+'C .stats'    );
        var divDiffCarte       = document.querySelector('#'+nameChamp+'C .difficult');
        var divSkinsCarte      = document.querySelector('#'+nameChamp+'C .skins'    );
        var divSpellsCarte     = document.querySelector('#'+nameChamp+'C .spells'   );
        var secPassifCarte     = document.querySelector('#'+nameChamp+'C .passif'   );
        var divLoreCarte       = document.querySelector('#'+nameChamp+'C .lore'     );

        //SECTION carte_principale
        $('#'+nameChamp+'C').css("background-image", "url(\"" + (champion.loadings[0]).link + "\")");
        $('#'+nameChamp+'C #bouton-enlever-carte').attr("onClick","enleverCarte(\""+nameChamp+"\")");

        //DIV titre
        $(divTitreCarte).append($("<h1>" + champion.name  + "</h1>"));
        $(divTitreCarte).append($("<h4>" + champion.title + "</h4>"));

        //DIV roles
        champion.roles.forEach((tag) =>  {
            $(divRoleCarte).append($("<p>" + tag + "</p>"));
        });

        //DIV stats
        $(divStatCarte).append($("<p>HP : "                     + champion.stats.HP        + "</p>"));
        $(divStatCarte).append($("<p>Vitesse de déplacement : " + champion.stats.MOVESPEED + "</p>"));
        $(divStatCarte).append($("<p>Armure : "                 + champion.stats.ARMOR     + "</p>"));
        $(divStatCarte).append($("<p>Rayon d'attaque : "        + champion.stats.RANGE     + "</p>"));
        $(divStatCarte).append($("<p>Dégats d'attaque : "       + champion.stats.DMG       + "</p>"));

        //DIV difficult
        $(divDiffCarte).append($("<p>Difficulté : " + champion.difficulty.DIFFICULTY + "</p>"));
        $(divDiffCarte).append($("<p>Attaque : "    + champion.difficulty.ATK        + "</p>"));
        $(divDiffCarte).append($("<p>Défense : "    + champion.difficulty.DEF        + "</p>"));
        $(divDiffCarte).append($("<p>Magie : "      + champion.difficulty.MAG        + "</p>"));

        //DIV skins
        champion.loadings.forEach((loading) =>  {
            $(divSkinsCarte).append($("<div><img src=\""
            + loading.link
            + "\" alt=\"\"><h3>"
            + loading.name
            + "</h3></div>"));
        });

        //DIV spells
        champion.spells.forEach((spell) =>  {
            $(divSpellsCarte).append($("<div><div><img src=\""
            + spell.link
            + "\" alt=\"\"><h3>"
            + spell.name
            + "</h3></div><p>"
            + spell.description
            + "<span id=\"Voir plus\"></span></p></div>"));
        });

        //SECTION passif
        $(secPassifCarte).append($("<div><div><img src=\""
        + champion.passive.link
        + "\" alt=\"\"><h3>"
        + champion.passive.name
        + "</h3></div><p>"
        + champion.passive.description
        + "<span id=\"Voir plus\"></span></p></div>"));

        //DIV lore
        $(divLoreCarte).append($("<p>" + champion.lore + "</p><span id=\"voir_plus\"></span>"));
    });
}

function afficherPlus(){

    var pParentofSpan = $("p:has( > span)");
    var spanVoirPlus  = $("#voir_plus"    );

    if(spanVoirPlus.style.height != "auto") {
        pParentofSpan.css("height", "auto");
        spanVoirPlus.html('Voir moins');
     } else {
        $('#a_manipuler').slideToggle();
        spanVoirPlus.html('Voir plus');
     }
}

function traitementResultat(){
    // 1 - Clean la zonne d'affichage :
    $("#bloc-resultats").empty();
    $("#bloc-gif-attente").css("display", "block");

    // 2 - recuperation de l'entree utilisateur puis
    // => conversion en liste de nom valide
    var entree = $("#champ_texte").val().trim();
    var names = ListeDePertinence(entree);

    // 3 - Traitement des données
    if(names.length == 0){
        // si pas de noms dans le tableau alors on affiche un message
        $("#bloc-resultats").append("<p class=\"info-vide\">( &empty; Aucun résultat trouvé )</p>)");
    }else{
        //sinon affiche autant de résultats que de noms.
        names.forEach(nom =>{
            afficheResultat(nom);
        });
    }
}



/**
 * Retourne une liste des noms de champion les plus approprié 
 * en fonction de la recherche passé en paramètre
 * 
 * @param {String} entree : la chaine de charactère tapé dans la barre de recherche
 * @returns {Array<String>}
 */
function ListeDePertinence(entree){
    debug("Entrée dans la liste de pertinence avec entree =", [entree]);
    // initialisation des vars :
    var lowerEntree = entree.toLowerCase();
    var listePointChamp = [];
    var nom_valide;

    NOM_CHAMPION.forEach(nom => {
        lowerNom = nom.toLowerCase();

        // créer une nouvelle entrée par nom dans la map
        var obj = {'name': nom, 'pertinence':0};
        

        // cas ou entree est un nom exacte
        if (lowerEntree == lowerNom) {
            nom_valide = nom;
            return;
        }else {
            // cas ou ce n'est pas un nom : 
            // -> recherche par occurence de chaque caractère = +1 points à chaque occurence:
            for(let c of lowerEntree){
                let tmp = lowerNom.split(c);
                obj.pertinence += tmp.length-1;
            }
            // -> recherche de la chaine entière = +10point si trouvé :
            if (lowerNom.indexOf(lowerEntree) != -1){
                obj.pertinence += 10;
            }
        }
        // ajout de l'objet dans le tableau
        listePointChamp.push(obj);
    });

    if (nom_valide !== undefined){
        debug("Retourne le nom :", [nom_valide]);
        return [nom_valide];
    }else{
        // trie dans l'ordre décroissant
        listePointChamp.sort(function(a,b){
            return b.pertinence - a.pertinence;
        });
        
        //On construit la liste de nom avec les X premier résultats le plus pertinent puis on la retourne:
        var listeNomResultat = [];
        var nb_resultat = getNbResultat();
        for(let i=0; i<nb_resultat; ++i){
            listeNomResultat.push(listePointChamp[i].name);
        }
        debug("Retourne la liste :", [listeNomResultat]);
        
        return listeNomResultat;
    }    
}
