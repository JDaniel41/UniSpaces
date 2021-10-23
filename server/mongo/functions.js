const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { Connection } = require("./Connection");

function insert(client) {
    Connection.open().then((client) => {});
}
function find(name, query, cb) {
    Connection.open()
        .then(async (client) => {
            var SchoolsSchema = new mongoose.Schema({
                Name: String,
                Buildings: Array,
                Building: Array,
            });

            const doc = await SchoolsSchema.findOne();

            doc instanceof SchoolsSchema; // true
            doc instanceof mongoose.Model; // true
            doc instanceof mongoose.Document; // true

            const collection = client.db("WebAppData").collection("Schools");
            collection.find(query).toArray(cb);
        })
        .catch((error) => {
            console.log(error);
        });

    // Connection.open()
    //     .then((client) => {
    //         const collection = client.db("WebAppData").collection("Schools");
    //         collection.find(query).toArray(cb);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
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

    return responseData;
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

function getPrompts(schoolName, buildingName) {
    return ["Mask Prompt", "Noise Prompt"];
}

function sendResponseData(schoolName, buildingName) {}

module.exports = { find, getResponseData };
