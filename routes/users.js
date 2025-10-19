const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdte } = require("../middlewares/validation");

const router = express.Router();

// Route to get current user info (protected)
router.get("/me", auth, getCurrentUser);

// Route to update current user info (protected)
router.patch("/me", auth, updateUser);

module.exports = router;
