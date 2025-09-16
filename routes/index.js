const express = require("express");
const { createUser, login } = require("../controllers/users");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const STATUS = require("../utils/statusCodes");

const router = express.Router();

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Routes (
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Unknown route
router.use((req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
