
function init(){
    /*
    var testTableau = {"a":"a","b":"b"};
    localStorage.setItem("Test",JSON.stringify(testTableau));
    console.log(JSON.parse(localStorage.getItem("Test")));
    */
    var testTableau = {"a":"a","b":"b"};
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
        $("#liste-favoris").empty();
        for(var f in fav){ // Parcourt des clés des favoris
            console.log(f)
        }
    }
}


function ajouterFavoris(){

    localStorage.setItem("f")

}

function supprimerFavoris(){
    
}