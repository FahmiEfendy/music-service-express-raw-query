const MySQL = require("mysql2/promise");
const _ = require("lodash");

const ConnectionPool = MySQL.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "music_service",
  port: 3306,
  connectionLimit: "1",
});

const __constructQueryResult = (query) => {
  const result = [];
  if (!_.isEmpty(query[0])) {
    query[0].forEach((item) => {
      const key = Object.keys(item);

      // Reconstruct query result
      const object = {};
      key.forEach((data) => {
        object[data] = item[data];
      });

      result.push(object);
    });
  }

  return result;
};

module.exports = {
  ConnectionPool,
  __constructQueryResult,
};
