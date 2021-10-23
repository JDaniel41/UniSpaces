const MongoClient = require("mongodb").MongoClient;
const { Connection } = require("./Connection");

function insert(client) {}

function find(name, query, cb) {
    Connection.open()
        .then((client) => {
            const collection = client.db("WebAppData").collection("Schools");
            collection.find(query).toArray(cb);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getResponseData(schoolName, buildingName) {
    // TODO: Get the prompts for this building
    let prompts = getPrompts(schoolName, buildingName);
    // TODO: For each prompt, go in the collection and get the responses
}

function getPrompts(schoolName, buildingName) {}

function sendResponseData(schoolName, buildingName) {}

module.exports = { find, getResponseData };
