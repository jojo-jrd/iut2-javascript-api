// VARIABLE GLOBALE
var compteurFavoris; // Compteur qui sert de clé dans le localStrorage pour le prochain ajout de favori



// ============ FONCTIONS D'INITIALISATION =======================

/**
 * Cette fonction est executé au lancement de la page,
 * elle permet de récupérer l'indice du prochain élément à ajouter au favoris.
 * Elle initialise aussi l'affichage de la partie favoris
 */
function init(){
    /*
    TODO A ENLEVER (PERMET LES TESTS)
    var testTableau = {1:"a",2:"b",3:"c"};
    localStorage.setItem("favoris",JSON.stringify(testTableau));
    */

    var favoris = localStorage.getItem("favoris"); // Récupération des favoris

    compteurFavoris = 0; // Initialisation de l'indice à 0
    if(favoris!=null){ // S'l y a déjà des favoris
        var fav = JSON.parse(favoris); // Convertit l'objet JSON en objet JS
        var i = 0;
        for(var f in fav){ // Parcourt des clés des favoris
            i = parseInt(f); // Convertit en entier la clé
        }
        compteurFavoris = i + 1; // Ajoute 1 à l'indice du dernier élément pour pouvoir rajouter dans le localStrorage
    }
    affichageFavoris(); // Affichage des favoris

    $("#bloc-resultats").empty();
    // INITIALISATION DES NOM DE CHAMPIONS :
    initNomCHamp();

    verificationEntree();

    // Ajout des raccourcis au clavier
    document.addEventListener('keydown', (event) => {
        const numTouche = event.keyCode;
      
        if (numTouche==13) { // Si touche entrée préssée
            traitementResultat();
            verificationEntree();
        }else if(event.ctrlKey && numTouche==170){
            ajouterFavoris();
        }
      

      }, false);

}




// ============ FONCTIONS D'AFFICHAGE DES FAVORIS ET DU BOUTON =======================

/**
 * Cette foncton vérifie l'entrée de la barre de recherche
 * elle désactive et change l'affichage du bouton favori à chaque bouton relaché
 */
function verificationEntree(){
    var texte = $("#champ_texte").val().trim(); // Recuperation du texte avec Jquery

    $("#btn-favoris").empty(); // Supprime le contenue du bouton favori

    if(texte==""){ // Si le champ est vide

        $("#btn-favoris").prop('disabled', true); // Désactive le bouton
        $("#btn-favoris").append("<img src=\"images/etoile-vide.svg\" alt=\"Etoile vide\" width=22 >") // Affiche une étoile vide
        $("#btn-favoris").css("background-color","#bebebe"); // Mets le fond en gris
        
    }else{

        $("#btn-favoris").prop('disabled', false); // Active le bouton
        $("#btn-favoris").css("background-color","var(--main-green)"); // Mets le fond en vert

        var dejaExistant = false;
        var favoris = localStorage.getItem("favoris");
        if(favoris!=null && Object.keys(JSON.parse(favoris)).length!=0){ // S'il y a bien des favoris
            favoris = JSON.parse(favoris); // Convertit l'objet JSON en objet JS
            for(var f in favoris){
                if(texte.toUpperCase()==favoris[f].toUpperCase().trim()){ // Si le texte est déjà dans les favoris
                    dejaExistant = true;
                }
            }
        }

        if(dejaExistant){ // S'il est déjà dans les favoris

            $("#btn-favoris").append("<img src=\"images/etoile-pleine.svg\" alt=\"Etoile pleine\" width=22 >");  // Affiche une étoile pleine

        }else{
        
            $("#btn-favoris").append("<img src=\"images/etoile-vide.svg\" alt=\"Etoile vide\" width=22 >"); // Affiche une étoile vide
        }

    }
}


/**
 * Fonction qui affiche les favoris qui sont dans le localStorage.
 * Sinon, affiche un message qu'il n'y a aucun favoris
 */
function affichageFavoris(){

    $("#liste-favoris").empty(); // suppression de tous les favoris affichés

    if(localStorage.getItem("favoris")==null || Object.keys(JSON.parse(localStorage.getItem("favoris"))).length==0){ // S'il n'y a pas de favoris
        $("#section-favoris").append("<p class=\"info-vide\">( &empty; Aucune recherche enregistrée )</p>"); // Affiche un message car aucun favoirs
    }else{
        $("#section-favoris .info-vide").remove(); // Supprime les eventuels messages
        var fav = JSON.parse(localStorage.getItem("favoris")); // Récupération des favoris en convertissant l'objet JSON en objet JS
        for(var f in fav){ // Parcourt des clés des favoris

            $("#liste-favoris").append("<li id="+f+"></li>"); // Affichage des favoris dans l'html avec JQuery
            $("#"+f).append("<span title=\"Cliquer pour relancer la recherche\" onClick=\"afficherUnFavoris('"+fav[f]+"')\">"+fav[f]+"</span>");
            $("#"+f).append("<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\" onClick=\"supprimerFavoris("+f+")\">");
        
        }
    }
}


/**
 * Fonction qui affiche le favoris cliqué et
 * les résultats qu'il donne
 */

function afficherUnFavoris(texte){ 
    $("#champ_texte").val(texte);
    traitementResultat();
    verificationEntree();
}





// ============ FONCTIONS D'AJOUT ET DE SUPPRESSION DES FAVORIS =======================

/**
 * Ajoute le champ texte dans les favoris.
 * S'il est déjà, il lui demande s'il veut le supprimer
 * Sinon il demande confirmation pour l'ajouter
 */
function ajouterFavoris(){
    var texte = $("#champ_texte").val().trim(); // Recuperation du texte avec Jquery en enlevant les espaces sur les cotés
    var favoris = localStorage.getItem("favoris");
    var ajout = false;

    if(favoris!=null && Object.keys(JSON.parse(favoris)).length!=0){ // Si des favoris déjà initialisés
        let impossible = false;
        var fav = JSON.parse(favoris); // Convertit l'objet JSON en objet JS
        var favAsupprimer;
        for(var f in fav){

            if(fav[f].toUpperCase().trim()==texte.toUpperCase()){ // Si favori déjà existant
                impossible = true;
                favAsupprimer = f; // Récupération du favoris à supprimer
            }
        }
        if(impossible){ // Si déjà dans les favoris
            
            supprimerFavoris(favAsupprimer); // Suppression du favoris
        }else{ // Demande d'ajout aux favoris
            ajout = true;
        }
    }else{ // Demande d'ajout aux favoris
        ajout = true;
    }

    // Ajout de l'élément aux favoris
    if(ajout){
        var verif = confirm("Etes vous sûr de vouloir ajouter \""+texte+"\" au favori ?");
        if(verif){ // Ajout aux favoris
            let objetConcatener = {};
            objetConcatener[compteurFavoris] = texte;
            let nouvelleObj;
            
            if(favoris!=null && Object.keys(JSON.parse(favoris)).length!=0){ // Ajout de l'élément aux précédents favoris s'il y en a
                nouvelleObj = Object.assign(JSON.parse(favoris),objetConcatener);
            }else{
                nouvelleObj = objetConcatener;
            }
            // Sauvegarde dans le localStorage
            localStorage.setItem("favoris",JSON.stringify(nouvelleObj)); // Convertit l'objet JS en objet JSON et ajout au localStrorage
            compteurFavoris++; // Ajoute 1 à l'id du prochain favoris
            affichageFavoris(); // Mise à jour de l'affichage pour le favori ajouté
            verificationEntree(); // Mise à jour de l'icone du bouton favoris
        }
        
    }
}


/**
 * Fonction qui supprime le favori ayant pour clé dans le localStorage,
 * l'id donné en paramètre
 * @param {String} id  id du favoris à supprimer
 */
function supprimerFavoris(id){
    
    var favoris = localStorage.getItem("favoris"); // Recuperation des favoris
    var verif = false;
    if(favoris!=null){
        var fav = JSON.parse(favoris); // Convertit l'objet JSON en objet JS
        if(fav!=null && fav[id]!=null){ // Si favori existant 
            verif = confirm("Etes vous sûr de vouloir supprimer \""+fav[id]+"\" des favoris ?");
        }
    }
    
    if(verif){ // Demande de suppression pour le champ-texte courant
        $("#"+id).remove(); // Suppression du favoris dans l'affichage
            
        delete fav[id]; // Suppression de l'élément en favoris

        localStorage.setItem("favoris",JSON.stringify(fav)) // Convertit l'objet JS en objet JSON et ajout au localStrorage
        
        affichageFavoris(); // Mise à jour de l'affichage si plus de favori
        verificationEntree(); // Mise à jour de l'icone du bouton favoris
    }
}