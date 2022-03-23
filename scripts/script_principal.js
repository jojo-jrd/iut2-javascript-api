var compteurFavoris;

function init(){

    

   /*
   <li>
        <span title="Cliquer pour relancer la recherche">Grenoble</span>
        <img src="images/croix.svg" alt="Icone pour supprimer le favori" width=15 title="Cliquer pour supprimer le favori">
    </li>
    
    */
    var testTableau = {1:"a",2:"b",3:"c"};
    localStorage.setItem("favoris",JSON.stringify(testTableau));
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
    // TODO faire changement de couleur
    if(texte==""){ // Si le champ est vide
        $("#btn-favoris").prop('disabled', true);
    }else{
        $("#btn-favoris").prop('disabled', false);
    }
}



function affichageFavoris(){ // TODO FAIRE LES LIENS CLIQUABLES


    var fav = JSON.parse(localStorage.getItem("favoris")); // Récupération
    $("#liste-favoris").empty(); // suppression de tous les favoris affichés
    for(var f in fav){ // Parcourt des clés des favoris
        $("#liste-favoris").append("<li id="+f+"></li>"); // Affichage des favoris dans l'html avec JQuery
        $("#"+f).append("<span title=\"Cliquer pour relancer la recherche\" onClick=\"alert(\'TODO\')\">"+fav[f]+"</span>");
        $("#"+f).append("<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\" onClick=\"supprimerFavoris("+f+")\">");
        console.log(f)
    }

}

function ajouterFavoris(){
    var texte = $("#champ_texte").val(); // Recuperation du texte avec Jquery
    var favoris = localStorage.getItem("favoris");
    var ajout = false;

    
    if(favoris!=null){ // Si des favoris déjà initialisés
        let impossible = false;
        var fav = JSON.parse(favoris);
        for(var f in fav){
            if(fav[f].toUpperCase()==texte.toUpperCase()){ // Si favori déjà existant
                impossible = true;
            }
        }
        if(impossible){
            alert("Favoris déjà existant"); // message d'erreur si impossible
            // faire avec JQeury UI
        }else{
            // ajouter
            ajout = true;
            

        }
    }else{
        ajout = true;
    }


    if(ajout){
        var verif = confirm("Etes vous sûr de vouloir ajouter \""+texte+"\" au favori ?");
        if(verif){
            let objetConcatener = {};
            objetConcatener[compteurFavoris] = texte;
            let nouvelleObj = Object.assign(fav,objetConcatener);
            // Sauvegarde dans le localStorage
            localStorage.setItem("favoris",JSON.stringify(nouvelleObj));
            compteurFavoris++;
            affichageFavoris();
        }
        
    }
}

function supprimerFavoris(id){
    // Voir les indices
    $("#"+id).remove();
    var favoris = localStorage.getItem("favoris");
    if(favoris!=null){
        var fav = JSON.parse(favoris);
        for(var f in fav){
            if(f==id){
                delete fav[f]; // A voir
            }
        }
        localStorage.setItem("favoris",JSON.stringify(fav))
    }
}