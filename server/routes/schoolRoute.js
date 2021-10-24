// Create Express Router for Schools
const express = require("express");
const schoolRouter = express.Router();
const { findSchools, findBuildings } = require("../mongo/functions");

schoolRouter.get("", async (req, res) => {
    let schools = await findSchools();
    res.send(schools.map((school) => school.Name));
});

schoolRouter.get("/:schoolName", async (req, res) => {
    let buildings = await findBuildings(req.params.schoolName);

    if (buildings && buildings.Building) {
        res.send(buildings.Building.map((building) => building.Name));
    } else if (buildings) {
        res.status(404).send("No buildings found for school");
    } else {
        res.sendStatus(404);
    }
});

module.exports = schoolRouter;
