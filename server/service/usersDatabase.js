const { ConnectionPool, __constructQueryResult } = require("./database");

const fileName = "server/service/usersDatabase.js";

USER_TABLE = "Users";
PLAYLIST_TABLE = "Playlists";

const getAllUsersData = async () => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(`SELECT * FROM ${USER_TABLE}`);

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    console.log([fileName, "GET All Users Data", "INFO"]);

    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "GET All Users Data", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const getUserDetailData = async (id) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(
      `
      SELECT 
        u.user_id, 
        u.username,
        GROUP_CONCAT(p.name) AS playlists
      FROM 
        ${USER_TABLE} u
      JOIN 
        ${PLAYLIST_TABLE} p ON u.user_id = p.user_id
      WHERE
        u.user_id = '${id}'
      GROUP BY
        u.user_id, u.username
      `
    );

    await poolConnection.connection.release();

    const result = __constructQueryResult(query);

    const formattedResult = result.map((data) => ({
      ...data,
      playlists: data.playlists.split(","),
    }));

    console.log([fileName, "GET User Detail", "INFO"]);

    return Promise.resolve(formattedResult);
  } catch (err) {
    console.log([fileName, "GET User Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const createUser = async (objectData) => {
  try {
    const { user_id, username, password } = objectData;

    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `INSERT INTO ${USER_TABLE} (user_id, username, password) VALUES ('${user_id}', '${username}', '${password}');`
    );

    await poolConnection.connection.release();

    console.log([fileName, "POST Create User", "INFO"]);

    return Promise.resolve(objectData);
  } catch (err) {
    console.log([fileName, "POST Create User", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

const removeUser = async (id) => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    await poolConnection.query(
      `DELETE FROM ${USER_TABLE} WHERE user_id = '${id}'`
    );

    await poolConnection.connection.release();

    console.log([fileName, "DELETE Remove User", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE Remove User", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.resolve([]);
  }
};

module.exports = {
  getAllUsersData,
  createUser,
  removeUser,
  getUserDetailData,
};
