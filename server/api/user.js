const Router = require("express").Router();

const userHelper = require("../helpers/userHelper");

const userList = async (req, res) => {
  try {
    const response = await userHelper.getUserList();

    res
      .status(200)
      .send({ message: "Successfully Get All Users", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", userList);

module.exports = Router;
