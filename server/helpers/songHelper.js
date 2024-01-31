const songsDatabase = require("../service/songsDatabase");

const getSongList = async () => {
  try {
    const data = await songsDatabase.getAllSongsData();

    return data;
  } catch (err) {
    return err.message;
  }
};

const getSongDetail = async (objectData) => {
  const { id } = objectData;

  try {
    const data = await songsDatabase.getSongDetailData(id);

    return data;
  } catch (err) {
    return err.message;
  }
};

const postCreateSong = async (objectData) => {
  const { title, singer, genre, duration } = objectData;

  const songList = await songsDatabase.getAllSongsData();

  const formattedData = {
    song_id: `song-${songList.length + 1}`,
    title,
    singer,
    genre,
    duration,
  };

  try {
    const data = await songsDatabase.createSong(formattedData);

    return data;
  } catch (err) {
    return err.message;
  }
};

const deleteRemoveSong = async (objectData) => {
  const { id } = objectData;

  try {
    await songsDatabase.removeSong(id);
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getSongList,
  getSongDetail,
  postCreateSong,
  deleteRemoveSong,
};
