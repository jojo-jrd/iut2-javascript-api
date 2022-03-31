// =============================  CONSTANTES =================================
var NOM_CHAMPION;           // => contient la liste des noms de champions disponible
var NB_RESULTAT = 5;        // => 
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
    });
}

function afficheResultat(nameChamp){
    $("#bloc-resultats").empty();
    $("#bloc-gif-attente").css("display", "block");

    getTemplateResultatInfo(nameChamp).then((champion) => {
        
        $("#bloc-gif-attente").css("display", "none");

        var temp = document.querySelector('#templateResultat');
        var divRoleResultat = temp.content.querySelector('.role_resultat');
        var divNameResultat = temp.content.querySelector('.name_resultat');
        var divStatResultat = temp.content.querySelector('.stat_resultat');
        var divLoreResultat = temp.content.querySelector('.lore_resultat');

        //SECTION main_sec
        $(temp.content.querySelector('.main_sec')).css("background-image", "url(" + (champion.splashs[0]).link + ")");
        $(temp.content.querySelector('.main_sec')).attr("onClick","clickResultat(\""+nameChamp+"\")");

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

        var clone = document.importNode(temp.content, true);
        $("#bloc-resultats").append(clone);
    });

}

function clickResultat(nomchamp){
    var temp = document.querySelector('#templateResultat');
    afficheCarte(nomchamp);
    $(temp.content.querySelector('.main_sec')).hide();
}

function enleverCarte(){
    var temp = document.querySelector('#templateResultat');
    $(temp.content.querySelector('.main_sec')).show();
    console.log("ENLEVER");
    $("#bloc-resultats").remove("#templateCarte");
}

function afficheCarte(nameChamp){

    getTemplateCarteInfo(nameChamp).then((champion) => {
        
        $("#bloc-gif-attente").css("display", "none");

        var temp = document.querySelector('#templateCarte');

        var divTitreCarte      = temp.content.querySelector('.titre'    );
        var divRoleCarte       = temp.content.querySelector('.roles'    );
        var divStatCarte       = temp.content.querySelector('.stats'    );
        var divDiffCarte       = temp.content.querySelector('.difficult');
        var divSkinsCarte      = temp.content.querySelector('.skins'    );
        var divSpellsCarte     = temp.content.querySelector('.spells'   );
        var secPassifCarte     = temp.content.querySelector('.passif'   );
        var divLoreCarte       = temp.content.querySelector('.lore'     );

        //SECTION carte_principale
        $(temp.content.querySelector('.carte_principale')).css("background-image", "url(\"" + (champion.loadings[0]).link + "\")");

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
        
        var clone = document.importNode(temp.content, true);
        $("#bloc-resultats").append(clone);
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

    // // 3 - Traitement des données
    // if(names.length == 0){
    //     // si pas de noms dans le tableau alors on affiche un message
    //     $("#bloc-resultats").append("<p class=\"info-vide\">( &empty; Aucun résultat trouvé )</p>)");
    // }else{
    //     //sinon affiche autant de résultats que de noms.
    //     names.forEach(nom =>{
    //         afficheResultat(nom);
    //     });
    // }
    afficheResultat(entree);
}



/**
 * Retourne une liste des noms de champion les plus approprié 
 * en fonction de la recherche passé en paramètre
 * 
 * @param {String} entree : la chaine de charactère tapé dans la barre de recherche
 * @returns {Array<String>}
 */
function ListeDePertinence(entree){
    debug("Entrée dans la liste de pertinence avec entree=", [entree]);
    // initialisation des vars :
    lowerEntree = entree.toLowerCase()
    listePointChamp = [];

    NOM_CHAMPION.forEach(nom => {
        lowerNom = nom.toLowerCase();

        // créer une nouvelle entrée par nom dans la map
        obj = {'nom': nom, 'pertinence':0};
        

        // cas ou entree est un nom exacte
        if (lowerEntree == lowerNom) {
            debug("Retourne le nom :", [nom]);
            return nom;
        }else {
            // cas ou ce n'est pas un nom : 
            // -> recherche par occurence de chaque caractère = +1 points à chaque occurence:
            for(let c of lowerEntree){
                tmp = lowerNom.split(c);
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
    debug("Sortie de la boucle => on se met à trier les pertinents :");
    // Si on arrive ici alors auccun nom complet n'a était trouvé alors on passe en mode recherche complxe
    listePointChamp.sort(function(a,b){
        return a.pertinence - b.pertinence;
    });
    console.log(listePointChamp);
    // TODO : trier par value et renvoyer les pertinents.
}
