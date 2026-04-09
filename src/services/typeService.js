import API from "./api";

function getType(name){
    // return API.get("/type/"+name);
    return API.get(`/type/${name}`);
}

function getTypes(){
     return API.get(`/type?limit=100`);
}

export default {
    getType,
    getTypes
}