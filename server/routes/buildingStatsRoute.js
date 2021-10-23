const express = require("express");
const buildingStatsRouter = express.Router();

const { getResponseData } = require("../mongo/functions");

buildingStatsRouter.get("/:schoolName/:buildingName", (req, res) => {
    getResponseData(req.params.schoolName, req.params.buildingName).then(
        (data) => {
            console.log(data);
            res.status(200).send(data);
        }
    );
});

buildingStatsRouter.post("/:schoolName/:buildingName", (req, res) => {
    let promptId = req.params.promptId;
    let newResponse = req.params.choice;
    // TODO: Update the database with the new response
    res.status(200).send({ response: "Hello!" });
});

module.exports = buildingStatsRouter;
