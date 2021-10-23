// Create Express Router for Schools
const express = require("express");
const schoolRouter = express.Router();

let schools = [
    "Clemson University",
    "Georgia Tech",
    "University of South Carolina",
    "University of Georgia",
];

schoolRouter.get("", (req, res) => {
    res.send(schools);
});

module.exports = schoolRouter;
