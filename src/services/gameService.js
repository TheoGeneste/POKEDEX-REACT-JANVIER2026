import API from "./api";

function getGames(){
    return API.get("/version?limit=100")
}

function getGame(game){
    return API.get("/version/"+game)
}

function getGroupeGame(game){
    return API.get("/version-group/"+game)
}


function getPokedex(pokedex){
    return API.get("/pokedex/"+pokedex)
}
export default {
    getGames,
    getGame,
    getGroupeGame,
    getPokedex
}