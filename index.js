const dotenv = require("dotenv");
const express = require("express");

require("dotenv").config;

const app = express();
const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
