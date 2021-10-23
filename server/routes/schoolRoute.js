// Create Express Router for Schools
const express = require("express");
const schoolRouter = express.Router();
const { find } = require("../mongo/functions");

let schools = [
    {
        name: "Clemson University",
        buildings: ["Cribb Hall", "Deschamps Hall", "Watt Innovation Center"],
    },
    {
        name: "University of South Carolina",
        buildings: ["USC Hall", "Deschamps Hall", "Watt Innovation Center"],
    },
    {
        name: "University of Georgia",
        buildings: [
            "Franklin Hall",
            "Deschamps Hall",
            "Watt Innovation Center",
        ],
    },
    {
        name: "Georgia Tech",
        buildings: ["Klaus Hall", "Deschamps Hall", "Watt Innovation Center"],
    },
];

schoolRouter.get("", (req, res) => {
    find("Schools", {}, (err, docs) => {
        res.send(docs.map((school) => school.Name));
    });
});

schoolRouter.get("/:schoolName", (req, res) => {
    let returnedSchool = schools.filter(
        (school) => school.name === req.params.schoolName
    );

    if (returnedSchool[0]) {
        res.send(returnedSchool[0].buildings);
    } else {
        res.status(404).send({ error: "School not found" });
    }
});

module.exports = schoolRouter;
