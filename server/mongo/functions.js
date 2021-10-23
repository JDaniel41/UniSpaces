const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { Connection } = require("./Connection");

function insert(client) {
    Connection.open().then((client) => {});
}
function find1 (name, query, cb) {
    Connection.open().then(async (client) => {

    const collection = client.db("WebAppData").collection("Schools");
    //console.log(collection.find(query).toArray(cb)[0].Building);
        
    }).catch((error) => {
        console.log(error)
    });
}

async function getResponseData(schoolName, buildingName) {
    // TODO: Get the prompts for this building
    let promptIds = getPrompts(schoolName, buildingName);

    // TODO: For each prompt, go in the collection and get the responses
    let responseData = await Promise.all(
        promptIds.map(async (promptId) => {
            return await getPromptResponses(promptId, schoolName, buildingName);
        })
    );

    console.log(responseData);

    return {
        schoolName: schoolName,
        buildingName: buildingName,
        responses: responseData,
    };
}

async function getPromptResponses(promptId, schoolName, buildingName) {
    const client = await Connection.open();

    const promptCollections = client.db("WebAppData").collection("Prompts");

    let prompt = await promptCollections.findOne({
        promptId: promptId,
    });

    const responseCollection = client
        .db("WebAppData")
        .collection(String(prompt.collectionName));

    let responses = await responseCollection
        .find({
            schoolName: schoolName,
            buildingName: buildingName,
        })
        .toArray();

    responses = responses.map((response) => {
        return response.value;
    });

    let returnObject = {
        questionText: prompt.promptText,
        promptId: promptId,
        choices: prompt.choices,
        responses: responses,
    };

    return returnObject;
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
