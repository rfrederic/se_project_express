const User = require("../models/User");
const STATUS = require("../utils/statusCodes");

// GET all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS.OK).send(users))
    .catch(() => {
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// GET user by ID
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS.NOT_FOUND).send({ message: "User not found" });
      }
      res.status(STATUS.OK).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid user ID" });
      }
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// CREATE user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS.CREATED).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid user data" });
      }
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, getUserById, createUser };
