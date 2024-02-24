const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

require("./src/db/mongoose");

const eventRoutes = require("./src/routes/eventsRoute");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("API for DataNeuron assignment");
});
app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Port running on ${process.env.PORT}`);
});
