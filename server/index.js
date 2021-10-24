const express = require("express");
const cors = require("cors");
const path = require("path");
const schoolRouter = require("./routes/schoolRoute");
const buildingStatsRouter = require("./routes/buildingStatsRoute");

// set up express app
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../client/build")));

// Set up a get route that returns a Hello World response
app.get("/test", (req, res) => {
    res.send({ response: "Hello World" });
});

app.use("/schools", schoolRouter);
app.use("/stats", buildingStatsRouter);

// Serve the Home Page
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// start express app
app.listen(process.env.PORT || 3001, () => {
    console.log("server started on port 3001");
});
