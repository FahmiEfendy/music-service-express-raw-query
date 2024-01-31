const Router = require("express").Router();

const playlistHelper = require("../helpers/playlistHelper");

const playlistList = async (req, res) => {
  try {
    const response = await playlistHelper.getPlaylistList();

    res
      .status(200)
      .send({ message: "Successfully Get All Playlists", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", playlistList);

module.exports = Router;
