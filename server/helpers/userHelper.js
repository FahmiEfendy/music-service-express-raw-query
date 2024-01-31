const usersDatabase = require("../service/usersDatabase");

const getUserList = async () => {
  try {
    const data = await usersDatabase.getAllUsersData();

    return data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getUserList,
};
