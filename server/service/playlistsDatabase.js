const { ConnectionPool, __constructQueryResult } = require("./database");

const fileName = "server/service/playlistsDatabase.js";

TABLE = "Playlists";

const getAllPlaylistsData = async () => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(`SELECT * FROM ${TABLE}`);

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

module.exports = {
  getAllPlaylistsData,
};
