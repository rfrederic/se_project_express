const express = require("express");
const { createUser, login } = require("../controllers/users");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

const NotFoundError = require("../errors/NotFoundError");

const router = express.Router();

// Public routes (with validation)
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

// Routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Unknown route
router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
