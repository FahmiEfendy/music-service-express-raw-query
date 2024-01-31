const { ConnectionPool, __constructQueryResult } = require("./database");

const fileName = "server/service/usersDatabase.js";

TABLE = "Users";

const getAllUsersData = async () => {
  try {
    const poolConnection = await ConnectionPool.getConnection();

    const query = await poolConnection.query(`SELECT * FROM ${TABLE}`);

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

module.exports = {
  getAllUsersData,
};
