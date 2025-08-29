const User = require("../models/user");
const STATUS = require("../utils/statusCodes");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

// GET /users/:userId
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(STATUS.OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      } else {
        return res
          .status(STATUS.INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

module.exports = { getUsers, createUser, getUserById };
