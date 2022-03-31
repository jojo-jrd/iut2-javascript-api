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

    return new Promise((resolve, reject) => {
        //effectue une requette api puis en fonciton de param retourne un résultat
        $.get(API_ALL_CHAMPIONS,
            (data) => {
                switch (param){
                    case NAME_ONLY:
                        debug("Calback getNamList.");
                        // résolution de la promesse
                        resolve(getNameList(data));
                        break;
                    default :
                        debug("Calback getCampionsList.");
                        // resolution de la promesse
                        resolve(getChampionsList(data));
                        break;
                }
            },
            "json");
    }); 
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
 function requestChampionInfoByName(name){
    debug("Entré dans la requestChampionInfo. param =", [name]);
    var address = API_NAME_CHAMPION + name + ".json";
    return new Promise((resolve, reject) =>{
        $.get(address,
            (data) => {
                var ChampionInfo = Object.values(data.data)[0]; // objet json du champion
                debug("Retourne : ", [ChampionInfo]);
                // résolution de la promesse 
                resolve(ChampionInfo);     
            },
            "json");
    });  
}


// ================ IMAGE FROM CHAMP INFO ===============

/**
 * Retourne les liens des images splash à partir 
 * d'un obj json de champion
 * 
 * @param {JSON_OBJ} obj 
 * @returns {Array<{'name':String, 'link':String}>}
 */
function getSplashFromObj(obj){
    debug("Entré dans la fonction getSplashFromObj. obj =", [obj]);
    var NameAndSplash = [];
    var skinList = obj.skins;
    Object.keys(skinList).forEach((key)=>{
        let skin = skinList[key];
        let name = skin.name;
        let link = API_IMAGE_SPLASH + obj.id + "_" + skin.num +".jpg"; // api/NomChamp_X.jpg
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
function getLoadingFromObj(obj){
    debug("Entré dans la fonction getLoadingFromObj. obj =", [obj]);
    var NameAndLoading = [];
    var skinList = obj.skins;
    Object.keys(skinList).forEach((key)=>{
        let skin = skinList[key];
        let name = skin.name;
        let link = API_IMAGE_LOADING + obj.id + "_" + skin.num +".jpg"; // api/NomChamp_X.jpg
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
function getSpellInfoFromObj(obj){
    debug("Entré dans la fonction getSpellInfoFromObj. obj=", [obj]);
    var SpellInfoList = [];
    var spellList = obj.spells;
    Object.keys(spellList).forEach(function(key){
        let spell = spellList[key];
        let name = spell.name;
        let link = API_IMAGE_SPELL + spell.image.full;
        let description = spell.description
        SpellInfoList.push({"name": name, "link": link, "description": description});
      }); 
      
    debug("Retourne le tableau :", [SpellInfoList]);
    return SpellInfoList;
}

/**
 * Cette fonciton retourne un objet json comprenant le nom, le lien 
 * vers l'image et la description du passive de l'obj champions fourni.
 * @param {JSON_OBJ} obj 
 * @returns {JSON_OBJ}
 */
function getPassivInfoFromObj(obj){
    debug("Entré dans la fonction getSpellAndImageFromObj. obj=", [obj]);

    var passive = obj.passive;
    var name = passive.name;
    var link = API_IMAGE_PASSIV + passive.image.full;
    var description = passive.description;
    PassivInfo = {"name": name, "link": link, "description": description};
      
    debug("Retourne l'objet :", [PassivInfo]);
    return PassivInfo;
}

// ============ SHORTCUT =======================

/**
 * Cette fonciton renvoi un objet json contentant toutes
 * les informations pour remplire un template "resultat"
 * @param {JSON_OBJ} obj : l'objet du champ en question
 * @returns {JSON_OBJ} : objet formaté pour un usage plus facile !
 */
function getTemplateResultatInfo(name){
    return requestChampionInfoByName(name).then((obj) => {
        debug("Entrée dans la foncion getTemplateResultatInfo. obj =", [obj]);
        var tableInfo = {};
        //role
        tableInfo.roles = obj.tags;

        // nom et dificulté
        tableInfo.name = obj.id;
        tableInfo.difficulty = obj.info.difficulty;

        // stat
        tableInfo.stats = {'HP': obj.stats.hp, 'DMG': obj.stats.attackdamage};

        //lore
        tableInfo.lore = obj.lore;

        // Splash asset :
        tableInfo.splashs = getSplashFromObj(obj);

        debug("Retoure l'objet json :", [tableInfo]);
        return tableInfo;
    });
}

/**
 * Cette fonciton renvoi un objet json contentant toutes
 * les informations pour remplire un template "Carte"
 * @param {JSON_OBJ} obj : l'objet du champ en question
 * @returns {JSON_OBJ} : objet formaté pour un usage plus facile !
 */
function getTemplateCarteInfo(name){
    return requestChampionInfoByName(name).then((obj) => {
        var tableInfo = {};
        // name & title
        tableInfo.name = obj.id;
        tableInfo.title = obj.title;

        //roles
        tableInfo.roles = obj.tags;

        //stats 
        var tmp = obj.stats;
        tableInfo.stats = {
            'HP': tmp.hp,
            'MOVESPEED': tmp.movespeed,
            'ARMOR': tmp.armor,
            'RANGE': tmp.attackrange,
            'DMG': tmp.attackdamage
        };
        
        //difficulty
        var tmp = obj.info
        tableInfo.difficulty = {
            'ATK': 8,
            'DEF': 4,
            'MAG': 3,
            'DIFFICULTY': 4
        };

        // splash/loading
        tableInfo.splashs = getSplashFromObj(obj);
        tableInfo.loadings = getLoadingFromObj(obj);

        // spells:
        tableInfo.spells = getSpellInfoFromObj(obj);

        // passive
        tableInfo.passive = getPassivInfoFromObj(obj);

        //lore
        tableInfo.lore = obj.lore;

        debug("Retourne l'obj json :", [tableInfo]);
        return tableInfo;
    })
}