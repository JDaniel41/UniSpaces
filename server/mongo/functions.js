const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const {Connection} = require('./Connection')

function insert(client){
    Connection.open().then((client) => {

    })
}
function find1 (name, query, cb) {
    Connection.open().then(async (client) => {

    const collection = client.db("WebAppData").collection("Schools");
    //console.log(collection.find(query).toArray(cb)[0].Building);
        
    }).catch((error) => {
        console.log(error)
    });
}

function getResponseData(schoolName, buildingName) {
    // TODO: Get the prompts for this building
    let prompts = getPrompts(schoolName, buildingName);
    // TODO: For each prompt, go in the collection and get the responses
}

function getPrompts(schoolName,buildingName) {

    Connection.open().then(async (client) => {
        const collection = client.db("WebAppData").collection("Schools");

        let prompts = await collection.findOne({Name: schoolName, Building : {$elemMatch: {Name: buildingName}}});

        let foundPrompt = prompts.Building.find((building) => {
            return building.Name === buildingName;
        });

        console.log(foundPrompt.Prompts);

        return foundPrompt;
        //console.log(collection.find(schoolName,buildingName));
    }).catch((error) => {
        console.log(error)
    });
}

function sendResponseData(schoolName, buildingName) {}

module.exports = { find1, getResponseData, getPrompts };
