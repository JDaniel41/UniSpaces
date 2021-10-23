const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { Connection } = require("./Connection");

function insert(client) {
    Connection.open().then((client) => {});
}
function find1(name, query, cb) {
    Connection.open()
        .then(async (client) => {
            const collection = client.db("WebAppData").collection("Schools");
            //console.log(collection.find(query).toArray(cb)[0].Building);
        })
        .catch((error) => {
            console.log(error);
        });
}

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

module.exports = { insertNewResponse, getResponseData, getPrompts };
