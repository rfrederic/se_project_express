const router = require("express").Router();
const auth = require("../middlewares/auth"); // your auth middleware

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// CRUD

// Create -> protected
router.post("/", auth, createItem);

// Read all items -> public
router.get("/", getItems);

// Delete -> protected
router.delete("/:itemId", auth, deleteItem);

// Like -> protected
router.put("/:itemId/likes", auth, likeItem);

// Unlike -> protected
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
