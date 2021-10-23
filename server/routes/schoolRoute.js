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

        if (school.Buildings) {
            res.send(school.Buildings);
        } else {
            res.status(404).send({
                response: "No buildings found for this school",
            });
        }
    });
});

module.exports = schoolRouter;
