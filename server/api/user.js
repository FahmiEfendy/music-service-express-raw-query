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

const userDetail = async (req, res) => {
  try {
    const response = await userHelper.getUserDetail(req.params);

    res.status(200).send({
      message: `Successfully Get User Detail with id of ${req.params.id}`,
      data: response,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const response = await userHelper.postCreateUser(req.body);

    res
      .status(201)
      .send({ message: "Successfully Create New User", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeUser = async (req, res) => {
  try {
    await userHelper.deleteRemoveUser(req.params);

    res.status(200).send({ message: "Successfully Deleted a User" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", userList);
Router.get("/detail/:id", userDetail);
Router.post("/create", createUser);
Router.delete("/remove/:id", removeUser);

module.exports = Router;
