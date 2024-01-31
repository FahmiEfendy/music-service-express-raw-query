const playlistsDatabase = require("../service/playlistsDatabase");

const getPlaylistList = async () => {
  try {
    const data = await playlistsDatabase.getAllPlaylistsData();

    return data;
  } catch (err) {
    return err.message;
  }
};

const getPlaylistDetail = async (objectData) => {
  const { id } = objectData;

  try {
    const data = await playlistsDatabase.getPlaylistDetailData(id);

    return data;
  } catch (err) {
    return err.message;
  }
};

const postCreatePlaylist = async (objectData) => {
  const { name, total_songs, user_id } = objectData;

  const playlistList = await playlistsDatabase.getAllPlaylistsData();

  const formattedData = {
    playlist_id: `playlist-${playlistList.length + 1}`,
    name,
    total_songs,
    user_id,
  };

  try {
    const data = await playlistsDatabase.createPlaylist(formattedData);

    return data;
  } catch (err) {
    return err.message;
  }
};

const deleteRemovePlaylist = async (objectData) => {
  const { id } = objectData;

  try {
    await playlistsDatabase.removePlaylist(id);
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getPlaylistList,
  getPlaylistDetail,
  postCreatePlaylist,
  deleteRemovePlaylist,
};
