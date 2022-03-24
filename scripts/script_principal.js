var compteurFavoris;

function init(){
    //var testTableau = {1:"a",2:"b",3:"c"};
    //localStorage.setItem("favoris",JSON.stringify(testTableau));
    var favoris = localStorage.getItem("favoris");

   compteurFavoris = 0;
    if(favoris!=null){
        var fav = JSON.parse(favoris);
        var i = 0;
        for(var f in fav){ // Parcourt des clés des favoris
            i = parseInt(f);
        }
        compteurFavoris = i + 1;
    }
    affichageFavoris();
}

// Function qui désactive ou active le bouton favoris en fonction du contenu du champ_texte
function verificationVide(){
    var texte = $("#champ_texte").val(); // Recuperation du texte avec Jquery
    if(texte==""){ // Si le champ est vide
        $("#btn-favoris").empty();
        $("#btn-favoris").prop('disabled', true);
        $("#btn-favoris").append("<img src=\"images/etoile-vide.svg\" alt=\"Etoile vide\" width=22 >")
        $("#btn-favoris").css("background-color","#bebebe");
        
    }else if(false){ // TODO faire verif si déjà dans la liste
        $("#btn-favoris").empty();
        $("#btn-favoris").prop('disabled', false);
        $("#btn-favoris").css("background-color","var(--main-green)");
        $("#btn-favoris").append("<img src=\"images/etoile-pleine.svg\" alt=\"Etoile vide\" width=22 >");
    }else{
        $("#btn-favoris").empty();
        $("#btn-favoris").prop('disabled', false);
        $("#btn-favoris").append("<img src=\"images/etoile-vide.svg\" alt=\"Etoile vide\" width=22 >")
        $("#btn-favoris").css("background-color","var(--main-green)");
    }
}



function affichageFavoris(){ // TODO FAIRE LES LIENS CLIQUABLES
    $("#liste-favoris").empty(); // suppression de tous les favoris affichés

    if(localStorage.getItem("favoris")==null || Object.keys(JSON.parse(localStorage.getItem("favoris"))).length==0){
        $("#section-favoris").append("<p class=\"info-vide\">( &empty; Aucune recherche enregistrée )</p>");
    }else{
        $("#section-favoris .info-vide").remove(); 
        var fav = JSON.parse(localStorage.getItem("favoris")); // Récupération
        for(var f in fav){ // Parcourt des clés des favoris
            $("#liste-favoris").append("<li id="+f+"></li>"); // Affichage des favoris dans l'html avec JQuery
            $("#"+f).append("<span title=\"Cliquer pour relancer la recherche\" onClick=\"alert(\'TODO\')\">"+fav[f]+"</span>");
            $("#"+f).append("<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\" onClick=\"supprimerFavoris("+f+")\">");
        }
    }
}

function ajouterFavoris(){
    var texte = $("#champ_texte").val(); // Recuperation du texte avec Jquery
    var favoris = localStorage.getItem("favoris");
    var ajout = false;

    if(favoris!=null && Object.keys(JSON.parse(favoris)).length!=0){ // Si des favoris déjà initialisés
        let impossible = false;
        var fav = JSON.parse(favoris);
        var favAsupprimer;
        for(var f in fav){
            if(fav[f].toUpperCase()==texte.toUpperCase()){ // Si favori déjà existant
                impossible = true;
                favAsupprimer = f;
            }
        }
        if(impossible){ // Si déjà dans les favoris
            var verif = confirm("Etes vous sûr de vouloir supprimer \""+texte+"\" des favoris ?");
            if(verif){
                supprimerFavoris(favAsupprimer);
            }
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
            let nouvelleObj
            // Ajout de lélément aux précédents favoris s'il y en a
            if(favoris!=null && Object.keys(JSON.parse(favoris)).length!=0){
                nouvelleObj = Object.assign(JSON.parse(favoris),objetConcatener);
            }else{
                nouvelleObj = objetConcatener;
            }
            // Sauvegarde dans le localStorage
            localStorage.setItem("favoris",JSON.stringify(nouvelleObj));
            compteurFavoris++;
            // Mise à jour de l'affichage pour le favori ajouté
            affichageFavoris();
        }
        
    }
}

function supprimerFavoris(id){
    $("#"+id).remove();
    var favoris = localStorage.getItem("favoris");
    if(favoris!=null){
        var fav = JSON.parse(favoris);
        for(var f in fav){
            if(f==id){
                delete fav[f]; // Suppression de l'élément en favoris
            }
        }
        localStorage.setItem("favoris",JSON.stringify(fav))
    }
    // Mise à jour de l'affichage si plus de favori
    affichageFavoris();
}