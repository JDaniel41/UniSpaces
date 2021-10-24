const express = require("express");
const buildingStatsRouter = express.Router();

const { getResponseData, insertNewResponse } = require("../mongo/functions");

buildingStatsRouter.get("/:schoolName/:buildingName", (req, res) => {
    getResponseData(req.params.schoolName, req.params.buildingName).then(
        (data) => {
            res.status(200).send(data);
        }
    );
});

buildingStatsRouter.post("/:schoolName/:buildingName", (req, res) => {
    let results = req.body.map((element) => {
        insertNewResponse(
            req.params.schoolName,
            req.params.buildingName,
            element.promptId,
            element.choice
        );
    });

    Promise.all(results).then(() => {
        res.status(200).send("Success");
    });
});

module.exports = buildingStatsRouter;
