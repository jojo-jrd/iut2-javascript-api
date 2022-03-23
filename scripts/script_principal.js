var compteurFavoris;

function init(){
    /*
    var testTableau = {"a":"a","b":"b"};
    localStorage.setItem("Test",JSON.stringify(testTableau));
    console.log(JSON.parse(localStorage.getItem("Test")));
    */
    var testTableau = {1:"a",2:"b",3:"c"};
    localStorage.setItem("favoris",JSON.stringify(testTableau));
    var favoris = localStorage.getItem("favoris");

   /*
   <li>
        <span title="Cliquer pour relancer la recherche">Grenoble</span>
        <img src="images/croix.svg" alt="Icone pour supprimer le favori" width=15 title="Cliquer pour supprimer le favori">
    </li>
    
    */
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

function affichageFavoris(){
    var fav = JSON.parse(localStorage.getItem("favoris"));
    $("#liste-favoris").empty();
    for(var f in fav){ // Parcourt des clés des favoris
        $("#liste-favoris").append("<li id="+f+"></li>");
        $("#"+f).append("<span title=\"Cliquer pour relancer la recherche\">"+fav[f]+"</span>");
        $("#"+f).append("<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\" onClick=\"supprimerFavoris("+f+")\">");
        console.log(f)
    }

}

function ajouterFavoris(){
    var texte = "TEST" // Recuperation du test avec Jquery
    var favoris = localStorage.getItem("favoris");
    var ajout = false;
    if(favoris!=null){
        let impossible = false;
        var fav = JSON.parse(favoris);
        for(var f in fav){
            if(fav[f]==texte){ // faire uppercaps...
                impossible = true;
            }
        }
        if(impossible){
            alert("Favoris déjà existant");
            // faire avec JQeury UI
        }else{
            // ajouter
            ajout = true;
            

        }
    }else{
        ajout = true;
    }


    if(ajout){// TODO PROBLEME INDICE CLE
        let nouvelleObj = Object.assign(fav,{compteurFavoris:texte});
        localStorage.setItem("favoris",JSON.stringify(nouvelleObj));
        compteurFavoris++;
        affichageFavoris();
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
                delete fav[f];
            }
        }
        localStorage.setItem("favoris",JSON.stringify(fav))
        console.log("Supprimer "+id);
    }
}