const express = require("express");
const buildingStatsRouter = express.Router();

const { getResponseData, insertNewResponse } = require("../mongo/functions");

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

    insertNewResponse(
        req.params.schoolName,
        req.params.buildingName,
        req.query.promptId,
        req.query.choice
    ).then((data) => {
        console.log(data);
        res.status(200).send(data);
    });
});

module.exports = buildingStatsRouter;
