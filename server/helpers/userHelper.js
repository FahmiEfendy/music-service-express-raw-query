const usersDatabase = require("../service/usersDatabase");

const getUserList = async () => {
  try {
    const data = await usersDatabase.getAllUsersData();

    return data;
  } catch (err) {
    return err.message;
  }
};

const postCreateUser = async (objectData) => {
  const { username, password } = objectData;

  const userList = await usersDatabase.getAllUsersData();

  const formattedData = {
    user_id: `user-${userList.length + 1}`,
    username,
    password,
  };

  try {
    const data = await usersDatabase.createUser(formattedData);

    return data;
  } catch (err) {
    return err.message;
  }
};

const deleteRemoveUser = async (objectData) => {
  const { id } = objectData;

  try {
    await usersDatabase.removeUser(id);
  } catch (err) {
    return err.message;
  }
};

const getUserDetail = async (objectData) => {
  const { id } = objectData;

  try {
    const data = await usersDatabase.getUserDetailData(id);

    return data;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getUserList,
  postCreateUser,
  deleteRemoveUser,
  getUserDetail,
};
