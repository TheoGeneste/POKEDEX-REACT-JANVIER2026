import API from "./api";

function getPokemons(offset = 0, elementPerPage = 20){
    return API.get("pokemon?offset="+offset+"&limit="+elementPerPage)
}

function getPokemon(name){
    return API.get("pokemon/"+name);
}

function getPokemonSpecies(name){
    return API.get("pokemon-species/"+name);

}

export default {
    getPokemons,
    getPokemon,
    getPokemonSpecies
}