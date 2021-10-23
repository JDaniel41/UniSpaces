// Create Express Router for Schools
const express = require("express");
const schoolRouter = express.Router();
const { find } = require("../mongo/functions");

schoolRouter.get("", (req, res) => {
    find("Schools", {}, (err, docs) => {
        res.send(docs.map((school) => school.Name));
    });
});

schoolRouter.get("/:schoolName", (req, res) => {
    find("Schools", {}, (err, docs) => {
        let school = docs.find(
            (school) => school.Name === req.params.schoolName
        );

        if (school && school.Buildings) {
            res.send({ buildings: school.Buildings });
        } else if (!school) {
            res.status(404).send({ error: "School not found" });
        } else {
            res.status(404).send({
                error: "No buildings found for this school",
            });
        }
    });
});

module.exports = schoolRouter;
