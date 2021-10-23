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

    return {
        schoolName: schoolName,
        buildingName: buildingName,
        responses: responseData,
        trendedResponses: 5,
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

    // Make a dictionary of the response type counts
    let responseCounts = {};
    responses.forEach((response) => {
        if (responseCounts[response]) {
            responseCounts[response] += 1;
        } else {
            responseCounts[response] = 1;
        }
    });

    // Convert responseCounts to array of tuples
    let responseCountsArray = [];
    for (let response in responseCounts) {
        responseCountsArray.push({
            name: response,
            count: responseCounts[response],
        });
    }

    let returnObject = {
        questionText: prompt.promptText,
        promptId: promptId,
        choices: prompt.choices,
        responses: responses,
        trainedResponses: responseCountsArray,
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

    console.log(promptId);
    // TODO: Get the Prompt Collection name from prompts
    let prompt = await collection.findOne({
        promptId: promptId,
    });
    console.log(prompt);

    const responseCollection = client
        .db("WebAppData")
        .collection(String(prompt.collectionName));

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
