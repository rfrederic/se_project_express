const express = require("express");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const router = express.Router();

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Protected routes (require JWT)
router.use(auth);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
