const express = require("express");
const buildingStatsRouter = express.Router();

const { getResponseData } = require("../mongo/functions");

function getDummyData(schoolName, buildingName) {
    return {
        school: schoolName,
        building: buildingName,
        responses: [
            {
                name: "Are people wearing a mask?",
                promptId: 1,
                choices: ["Not a lot", "About Half", "Everyone is masking"],
                lastResponse: "Everyone is masking",
                allResponse: [
                    [1, "Everyone is masking"],
                    [2, "About Half"],
                    [3, "Not a lot"],
                    [4, "Everyone is masking"],
                ],
            },
            {
                name: "What is the noise level?",
                promptId: 2,
                choices: ["No Noise", "Low", "Medium", "High"],
                lastResponse: "Medium",
                allResponse: [
                    [1, "Medium"],
                    [2, "Low"],
                    [3, "No Noise"],
                    [4, "Medium"],
                ],
            },
            {
                name: "How full is the parking lot?",
                promptId: 3,
                choices: ["Empty", "Somewhat Empty", "Somewhat Full", "Full"],
                lastResponse: "Somewhat Full",
                allResponse: [
                    [1, "Somewhat Full"],
                    [2, "Somewhat Empty"],
                    [3, "Empty"],
                    [4, "Somewhat Full"],
                ],
            },
        ],
    };
}

buildingStatsRouter.get("/:schoolName/:buildingName", (req, res) => {
    console.log(req.params.sendAllResponses);
    responseData = getResponseData(
        req.params.schoolName,
        req.params.buildingName
    );
    res.send(getDummyData(req.params.schoolName, req.params.buildingName));
});

buildingStatsRouter.post("/:schoolName/:buildingName", (req, res) => {
    // TODO: Add Response to Mongo
    // make sure we send buildng and school name

    let promptId = req.params.promptId;
    let newResponse = req.params.choice;
    getResponseData(req.params.schoolName, req.params.buildingName).then(
        (data) => {
            console.log(data);
            res.status(200).send(data);
        }
    );
});

module.exports = buildingStatsRouter;
