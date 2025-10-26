const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

const router = express.Router();

// Route to get current user info (protected)
router.get("/me", auth, getCurrentUser);

// Route to update current user info (protected + validated)
router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
