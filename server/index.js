const express = require("express");
const cors = require("cors");
const schoolRouter = require("./routes/schoolRoute");
const buildingStatsRouter = require("./routes/buildingStatsRoute");

// set up express app
const app = express();
app.use(cors());

// Set up a get route that returns a Hello World response
app.get("/test", (req, res) => {
    res.send({ response: "Hello World" });
});

app.use("/schools", schoolRouter);
app.use("/stats", buildingStatsRouter);

// start express app
app.listen(process.env.PORT || 3001, () => {
    console.log("server started on port 3001");
});
