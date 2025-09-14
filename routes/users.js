const express = require("express");
const { getCurrentUser } = require("../controllers/users");

const router = express.Router();

// Route to get current user info
router.get("/me", getCurrentUser);

module.exports = router;
