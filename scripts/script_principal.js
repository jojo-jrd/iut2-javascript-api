
function init(){
    /*
    var testTableau = {"a":"a","b":"b"};
    localStorage.setItem("Test",JSON.stringify(testTableau));
    console.log(JSON.parse(localStorage.getItem("Test")));
    */
    var testTableau = {"1":"a","2":"b"};
    localStorage.setItem("favoris",JSON.stringify(testTableau));
    var favoris = localStorage.getItem("favoris");

   /*
   <li>
        <span title="Cliquer pour relancer la recherche">Grenoble</span>
        <img src="images/croix.svg" alt="Icone pour supprimer le favori" width=15 title="Cliquer pour supprimer le favori">
    </li>
    */
    if(favoris!=null){
        var fav = JSON.parse(favoris);
        //$("#liste-favoris").empty();
        for(var f in fav){ // Parcourt des clés des favoris
            $("#liste-favoris").append("<li id="+f+"></li>");
            $("#"+f).append("<span title=\"Cliquer pour relancer la recherche\">"+fav[f]+"</span>");
            $("#"+f).append("<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\" onClick=\"supprimerFavoris("+f+")\">");
            console.log(f)
        }
    }
}


function ajouterFavoris(id){
    

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