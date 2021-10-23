// Import Express
const express = require("express");

// set up express app
const app = express();

let schools = [
    "Clemson University",
    "Georgia Tech",
    "University of South Carolina",
    "University of Georgia",
];

// Set up a get route that returns a Hello World response
app.get("/test", (req, res) => {
    res.send({ response: "Hello World" });
});

app.get("/schools", (req, res) => {
    res.send(schools);
});

// start express app
app.listen(process.env.PORT || 3000, () => {
    console.log("server started on port 3000");
});
