const dotenv = require("dotenv");
const express = require("express");

const user = require("./server/api/user");
const playlist = require("./server/api/playlist");
const song = require("./server/api/song");

require("dotenv").config;

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hello!");
});

app.use("/user", user);
app.use("/playlist", playlist);
app.use("/song", song);

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
