const songsDatabase = require("../service/songsDatabase");

const getSongList = async () => {
  try {
    const data = await songsDatabase.getAllSongsData();

    return data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getSongList,
};
