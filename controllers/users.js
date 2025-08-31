const User = require("../models/User");
const STATUS = require("../utils/statusCodes");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS.CREATED).send({ data: user }))
    .catch((err) => {
      console.error(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports = { getUsers, createUser };
