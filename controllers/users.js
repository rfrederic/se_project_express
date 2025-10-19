const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const STATUS = require("../utils/statusCodes");
const { JWT_SECRET = "dev-secret" } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

//  Create new user (signup)
const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(STATUS.CREATED).send(userObj);
  } catch (err) {
    if (err.code === STATUS.DUPLICATE_KEY_VIOLATION) {
      return next(new ConflictError("Email already exists"));
    }
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid user data"));
    }
    return next(err);
  }
};

//  Login user (signin)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError("Email and password are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new UnauthorizedError("Invalid email or password"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError("Invalid email or password"));
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

//  Get current logged-in user
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError("User not found"));
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

//  Update user profile
const updateUser = async (req, res, next) => {
  try {
    const { name, avatar, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new NotFoundError("User not found"));
    }

    return res.send(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid user data"));
    }
    return next(err);
  }
};

module.exports = { createUser, login, getCurrentUser, updateUser };
