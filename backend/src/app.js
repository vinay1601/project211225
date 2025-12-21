const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Property XML API running");
});

app.use("/api/properties", require("./routes/property.routes"));
app.use("/api/import", require("./routes/import.routes")); 

module.exports = app;
