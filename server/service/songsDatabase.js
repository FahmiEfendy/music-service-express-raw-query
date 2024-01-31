const { ConnectionPool, __constructQueryResult } = require("./database");

const fileName = "server/service/songsDatabase.js";

SONG_TABLE = "Songs";

const getAllSongsData = async () => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(`SELECT * FROM ${SONG_TABLE}`);

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    console.log([fileName, "GET All Songs Data", "INFO"]);

    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "GET All Songs Data", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const getSongDetailData = async (id) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(
      `SELECT * FROM ${SONG_TABLE} WHERE song_id = '${id}'`
    );

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    console.log([fileName, "GET Song Detail", "INFO"]);

    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "GET Song Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const createSong = async (objectData) => {
  try {
    const { song_id, title, singer, genre, duration } = objectData;

    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `INSERT INTO ${PLAYLIST_TABLE} (song_id, title, singer, genre, duration) VALUES ('${song_id}', '${title}', '${singer}', '${genre}', '${duration}');`
    );

    await poolConnection.connection.release();

    console.log([fileName, "POST Create Song", "INFO"]);

    return Promise.resolve(objectData);
  } catch (err) {
    console.log([fileName, "POST Create Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const removeSong = async (objectData) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `DELETE FROM ${SONG_TABLE} WHERE song_id = '${id}'`
    );

    await poolConnection.connection.release();

    console.log([fileName, "DELETE Remove Song", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE Remove Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

module.exports = {
  getAllSongsData,
  getSongDetailData,
  createSong,
  removeSong,
};
