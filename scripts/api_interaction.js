/*
- fonction recherche :
    fonction comparaison chaine charactere avec liste personnages
    fonction ajax qui récupère les données (nom) + traduction de l'object JSON vers un objet JS
    fonction qui affiche le contenue de l'objet récupéré 
        => async function : traduction des images en vrais lien
*/
// =============================  CONSTANTES =================================
// AIDE DEVELOPPEUR :
var DEBUG = true;           // => passer à false avant la mise en développement 
/**
 * Affiche le message voulu si le mode débug est actif
 * @param {String} msg  message a afficher
 * @param {?Array} param (Optionel) parametre(s) à afficher 
 */
function debug(msg, param){
    if(DEBUG){
        console.log("[DEBUG] : " + msg);
        if(param != null){
            console.log("\t[Parametre value]");
            param.forEach(element => {
                console.log(element);
            });
        }
    }
}

// API ENDPOINT :
var API_ALL_CHAMPIONS = "https://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json";
var API_NAME_CHAMPION = "https://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion/";      // + Nomchamp.json
var API_IMAGE_SPLASH = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/";               // + Nomchamp_X.jpg
var API_IMAGE_LOADING = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";             // + Nomchamp_X.jpg
var API_IMAGE_PASSIV = "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/"                 // + Nomchamp_P.png
var API_IMAGE_SPELL = "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/";                   // + SpellName.png

// SPECIAL REQUEST PARAM :
var NAME_ONLY = 0           // => récupère seuleument le/les noms

// ================================================================================

// ======= RECHERCHE COMPLEXE (plusieur résultat) ===========

/**
 * Effectue une requete auprès de l'api pour récupérer toutes
 * la liste des champions avec des informations brèves...
 * @param {SPECIAL REQUEST PARAM} => liste et détails dans CONSTANTES -> special request param
 */
function requestChampionsList(param){
    debug("Entré dans la requestChampionsList. param =", [param]);
    $.get(API_ALL_CHAMPIONS,
        (data) => {
            switch (param) {
                case NAME_ONLY:
                    debug("Calback getNamList.");
                    getNameList(data);
                    break;
            
                default :
                    debug("Calback getCampionsList.");
                    getChampionsList(data);
                    break;
            }
        },
        "json");
}

/**
 * Traite et retourne la liste de tous les objet JSON des champions
 * dans un array Javascript
 * @returns {array<JSON_OBJ>}
 */
function getChampionsList(data){
    debug("Entré dans la fonciton getChampionsList. data = ",[data]);
    var ChampList = data.data;
    debug("Retourne :", [ChampList]);
    return ChampList;
}

/**
 * Traite et retourne la liste de tous les noms des champions
 * dans un array Javascript
 * @returns {array<STRING>}
 */
 function getNameList(data){
    debug("Entré dans la fonciton getNameList. data = ",[data]);
    var ChampList = data.data;
    var NameList = [];
    
    Object.keys(ChampList).forEach((key) =>{
        NameList.push(key);
    });

    debug("Retourne :", [NameList]);
    return NameList;
}

// ======= RECHERCHE SIMPLE (un seul résultat) =================

/**
 * Effectue une requete auprès de l'api pour récupérer toutes les
 * information sur UN champion
 * 
 * @param {String} nom  nom du champion recherché.
 * @param {SPECIAL REQUEST PARAM} => liste et détails dans CONSTANTES -> special request param
 */
 function requestChampionInfo(name, param){
    debug("Entré dans la requestChampionInfo. param =", [name, param]);
    var address = API_NAME_CHAMPION + name + ".json";
    $.get(address,
        (data) => {
            switch (param) {
                default :
                    debug("Calback getCampionInfo.");
                    getChampionInfoByName(data);
                    break;
            }
        },
        "json");
}

/**
 * Retourne un objet json contenant toutes les informations sur
 * le champion.
 * 
 * @returns {Array<JSON_OBJ>}
 */
 function getChampionInfoByName(data){
    debug("Entré dans la fonction getChampionInfoByName. data =", [data]);
    var ChampionInfo = Object.values(data.data)[0]; // objet json du champion
    debug("Retourne : ", [ChampionInfo]);
    return ChampionInfo;
}


// ================ IMAGE FROM CHAMP INFO ===============

function loadOBJTMP() {
    var address = API_NAME_CHAMPION + "Aatrox.json";
    $.get(address,
        (data) => {
            getLoadingFromObj(data);
            getSplashFromObj(data);
            
        },
        "json");
  }

/**
 * Retourne les liens des images splash à partir 
 * d'un obj json de champion
 * 
 * @param {JSON_OBJ} obj 
 * @returns {Array<{'name':String, 'link':String}>}
 */
function getSplashFromObj(data){
    var obj = Object.values(data.data)[0];
    debug("Entré dans la fonction getSplashFromObj. obj =", [obj]);
    var NameAndSplash = [];
    var skinList = obj.skins;
    Object.keys(skinList).forEach((key)=>{
        let skin = skinList[key];
        let name = skin.name;
        let link = API_IMAGE_SPLASH + obj.id + "_" + key +".jpg"; // api/NomChamp_X.jpg
        NameAndSplash.push({'name': name, 'link': link});
    });
    debug("Retourne le tableau de splash :", [NameAndSplash]);

    return NameAndSplash;
}

/**
 * Retourne les liens des images loadings à partir 
 * d'un obj json de champion
 * 
 * @param {JSON_OBJ} obj 
 * @returns {Array<{'name':String, 'link':String}>}
 */
function getLoadingFromObj(data){
    var obj = Object.values(data.data)[0];
    debug("Entré dans la fonction getLoadingFromObj. obj =", [obj]);
    var NameAndLoading = [];
    var skinList = obj.skins;
    Object.keys(skinList).forEach((key)=>{
        let skin = skinList[key];
        let name = skin.name;
        let link = API_IMAGE_LOADING + obj.id + "_" + key +".jpg"; // api/NomChamp_X.jpg
        NameAndLoading.push({'name': name, 'link': link});
    });
    debug("Retourne le tableau de Loading :", [NameAndLoading]);

    return NameAndLoading;
}

/**
 * Retourne un tableau d'objet json contenant le nom de chaque spell
 * et le lien vers son image assoscié.
 * @param {JSON_OBJ} obj  
 * @returns {Array<{name : String, link : String}>} 
 */
function getSpellAndImageFromObj(data){
    var obj = Object.values(data.data)[0];
    debug("Entré dans la fonction getSpellAndImageFromObj. obj=", [obj]);
    var NameAndImageList = [];
    var spellList = obj.spells;
    Object.keys(spellList).forEach(function(key){
        let spell = spellList[key];
        let name = spel.name;
        let link = API_IMAGE_SPELL + spell.image.full;
        NameAndImageList.push({"name": name, "link": link});
      }); 
      
    debug("Retourne le tableau :", NameAndImageList);
    return NameAndImageList;
}

 
// 4 - passiv