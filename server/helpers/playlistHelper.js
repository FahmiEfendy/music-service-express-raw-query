const playlistsDatabase = require("../service/playlistsDatabase");

const getPlaylistList = async () => {
  try {
    const data = await playlistsDatabase.getAllPlaylistsData();

    return data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getPlaylistList,
};
