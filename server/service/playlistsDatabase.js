const { ConnectionPool, __constructQueryResult } = require("./database");

const fileName = "server/service/playlistsDatabase.js";

PLAYLIST_TABLE = "Playlists";

const getAllPlaylistsData = async () => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(`SELECT * FROM ${PLAYLIST_TABLE}`);

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    console.log([fileName, "GET All Playlists Data", "INFO"]);

    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "GET All Playlists Data", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const getPlaylistDetailData = async (id) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(
      `SELECT * FROM ${PLAYLIST_TABLE} WHERE playlist_id = '${id}'`
    );

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    console.log([fileName, "GET Playlist Detail", "INFO"]);

    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "GET Playlist Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const createPlaylist = async (objectData) => {
  try {
    const { playlist_id, name, total_songs, user_id } = objectData;

    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `INSERT INTO ${PLAYLIST_TABLE} (playlist_id, name, total_songs, user_id) VALUES ('${playlist_id}', '${name}', '${total_songs}', '${user_id}');`
    );

    await poolConnection.connection.release();

    console.log([fileName, "POST Create Playlist", "INFO"]);

    return Promise.resolve(objectData);
  } catch (err) {
    console.log([fileName, "POST Create Playlist", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const removePlaylist = async (id) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `DELETE FROM ${PLAYLIST_TABLE} WHERE playlist_id = '${id}'`
    );

    await poolConnection.connection.release();

    console.log([fileName, "DELETE Remove Playlist", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE Remove Playlist", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

module.exports = {
  getAllPlaylistsData,
  getPlaylistDetailData,
  createPlaylist,
  removePlaylist,
};
