import API from "./api";

function getGenerations(){
    return API.get("/generation")
}

function getGeneration(generation){
    return API.get("/generation/"+generation);
}

export default {
    getGeneration,
    getGenerations
}