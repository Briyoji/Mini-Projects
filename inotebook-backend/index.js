const connectMongoDB = require("./config/db");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectMongoDB();

app.listen(port, () => {
  console.log(`iNoteBook Backend listening at http://localhost:${port}`);
});

mongoose.connection.on("error", (err) => {
  app.get("/", require("./routes/connection-error"));
});

mongoose.connection.on("connected", () => {
  app.get("/", require("./routes/index"));
});
