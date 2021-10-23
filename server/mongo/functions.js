const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { Connection } = require("./Connection");

async function findSchools() {
    const client = await Connection.open();

    const collection = client.db("WebAppData").collection("Schools");

    let schools = await collection.find().toArray();

    return schools;
}

async function findBuildings(schoolName) {
    const client = await Connection.open();

    const collection = client.db("WebAppData").collection("Schools");

    let buildings = await collection.findOne({
        Name: schoolName,
    });

    return buildings;
}
// This function is getting response data from mongoDB
async function getResponseData(schoolName, buildingName) {
    let promptIds = await getPrompts(schoolName, buildingName);

    let responseData = await Promise.all(
        promptIds.Prompts.map(async (promptId) => {
            console.log(promptId);
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
// This is getting prompt responses from the mongoDB
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
// This is getting the prompts for any school or building
async function getPrompts(schoolName, buildingName) {
    const client = await Connection.open();

    const collection = client.db("WebAppData").collection("Schools");

    let prompts = await collection.findOne({
        Name: schoolName,
        Building: { $elemMatch: { Name: buildingName } },
    });

    let foundPrompt = prompts.Building.find((building) => {
        return building.Name === buildingName;
    });

    //console.log(foundPrompt.Prompts);

    return foundPrompt;
}
// This inserts new responses for various questions
async function insertNewResponse(schoolName, buildingName, promptId, response) {
    const client = await Connection.open();

    const collection = client.db("WebAppData").collection("Prompts");

    // TODO: Get the Prompt Collection name from prompts
    let prompt = await collection.findOne({
        promptId: promptId,
    });

    const responseCollection = client
        .db("WebAppData")
        .collection(String(prompt.collectionName));

    console.log(Date.now());
    await responseCollection.insertOne({
        schoolName: schoolName,
        buildingName: buildingName,
        value: response,
        timestamp: Date.now(),
    });
}

function sendResponseData(schoolName, buildingName) {}

module.exports = {
    insertNewResponse,
    getResponseData,
    getPrompts,
    findSchools,
    findBuildings,
};
