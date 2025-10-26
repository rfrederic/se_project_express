const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { validateItemBody, validateId } = require("../middlewares/validation");

// Create item (protected + validated)
router.post("/", auth, validateItemBody, createItem);

// Read all items (public)
router.get("/", getItems);

// Delete item (protected + validated)
router.delete("/:itemId", auth, validateId, deleteItem);

// Like item (protected + validated)
router.put("/:itemId/likes", auth, validateId, likeItem);

// Unlike item (protected + validated)
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
