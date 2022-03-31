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
        $(divLoreResultat).append($("<p>" + champion.lore + "<span id=\"Voir plus\">Voir plus</span></p>"));

        var clone = document.importNode(temp.content, true);
        $("#bloc-resultats").append(clone);
    });

}


function afficheCarte(nameChamp){
    $("#bloc-resultats").empty();
    $("#bloc-gif-attente").css("display", "block");

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
        $(temp.content.querySelector('.main_sec')).css("background-image", "url(" + (champion.loadings[0]).link + ")");

        //DIV titre
        $(divTitreCarte).append($("<h1>" + champion.name  + "</h1>"));
        $(divTitreCarte).append($("<h4>" + champion.title + "</h4>"));

        //DIV roles
        champion.roles.forEach((tag) =>  {
            $(divRoleCarte).append($("<p>" + tag + "</p>"));
        });

        //DIV stats
        $(divStatCarte).append($("<p>HP : "                     + champion.HP        + "</p>"));
        $(divStatCarte).append($("<p>Vitesse de déplacement : " + champion.MOVESPEED + "</p>"));
        $(divStatCarte).append($("<p>Armure : "                 + champion.ARMOR     + "</p>"));
        $(divStatCarte).append($("<p>Rayon d'attaque : "        + champion.RANGE     + "</p>"));
        $(divStatCarte).append($("<p>Dégats d'attaque : "       + champion.DMG       + "</p>"));

        //DIV difficult
        $(divDiffCarte).append($("<p>Difficulté : " + champion.DIFFICULTY + "</p>"));
        $(divDiffCarte).append($("<p>Attaque : "    + champion.ATK        + "</p>"));
        $(divDiffCarte).append($("<p>Défense : "    + champion.DEF        + "</p>"));
        $(divDiffCarte).append($("<p>Magie : "      + champion.MAG        + "</p>"));

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
        $(divLoreCarte).append($("<p>" + champion.lore + "<span id=\"voir_plus\"></span></p>"));
        
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
    var nomchamp = $("#champ_texte").val().trim();
    // TODO
    // <p class="info-vide">( &empty; Aucun résultat trouvé )</p>
    afficheResultat(nomchamp);
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
        obj = {};
        obj[nom] = 0;
        listePointChamp.push(obj);

        // cas ou entree est un nom exacte
        if (lowerEntree == lowerNom) {
            return nom;
        }else {
            // cas ou ce n'est pas un nom : 
            // -> recherche par occurence de chaque caractère = +1 points à chaque occurence:
            for(let c of lowerEntree){
                tmp= lowerNom.split(c);
                listePointChamp[nom] = tmp.length-1;
            }
            // -> recherche de la chaine entière = +10point si trouvé :
            if (lowerNom.indexOf(lowerEntree) != -1){
                listePointChamp[nom] += 10;
            }
        }
    });
    // Si on arrive ici alors auccun nom complet n'a était trouvé alors on passe en mode recherche complxe
    console.log(listePointChamp);
    // TODO : trier par value et renvoyer les pertinents.
}
