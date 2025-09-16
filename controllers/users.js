const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const STATUS = require("../utils/statusCodes");
const { JWT_SECRET = "dev-secret" } = require("../utils/config");

//  Create new user (signup)
const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    // Hash the password before saving
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });

    // Remove password before sending response
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(STATUS.CREATED).send(userObj);
  } catch (err) {
    if (err.code === STATUS.DUPLICATE_KEY_VIOLATION) {
      return res
        .status(STATUS.CONFLICT)
        .send({ message: "Email already exists" });
    }
    if (err.name === "ValidationError") {
      return res
        .status(STATUS.BAD_REQUEST)
        .send({ message: "Invalid user data" });
    }
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

//  Login user (signin)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(STATUS.BAD_REQUEST).send({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: "Invalid email or password" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.send({ token });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
      message: "An error has occurred on the server",
    });
  }
};

//  Get current logged-in user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(STATUS.NOT_FOUND).send({ message: "User not found" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
      message: "An error has occurred on the server",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, avatar, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(STATUS.NOT_FOUND).send({ message: "User not found" });
    }

    return res.send(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(STATUS.BAD_REQUEST)
        .send({ message: "Invalid user data" });
    }
    return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
      message: "An error has occurred on the server",
    });
  }
};

module.exports = { createUser, login, getCurrentUser, updateUser };
