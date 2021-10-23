// Import Express
const express = require("express");

// set up express app
const app = express();

// Set up Get Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// start express app
app.listen(3000, () => {
    console.log("server started on port 3000");
});
