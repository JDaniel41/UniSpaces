const express = require("express");
const schoolRouter = require("./routes/schoolRoute");

// set up express app
const app = express();

// Set up a get route that returns a Hello World response
app.get("/test", (req, res) => {
    res.send({ response: "Hello World" });
});

app.use("/schools", schoolRouter);

// start express app
app.listen(process.env.PORT || 3000, () => {
    console.log("server started on port 3000");
});
