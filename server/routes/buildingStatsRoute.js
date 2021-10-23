const express = require("express");
const buildingStatsRouter = express.Router();

let buildingStats = [
    {
        school: "Clemson University",
        buildings: [
            {
                name: "Baker Hall",
                maskObservations: [(1, "Not a lot")],
            },
        ],
    },
];

buildingStatsRouter.get("/:schoolName/:buildingName", (req, res) => {
    console.log(req.params.sendAllResponses);
    res.send({});
});

module.exports = buildingStatsRouter;
