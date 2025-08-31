const router = require("express").Router();
const clothingItem = require("./clothingItems");
const usersRouter = require("./users");
const STATUS = require("../utils/statusCodes");

router.use("/items", clothingItem);
router.use("/users", usersRouter);

router.use((req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: "Resource not found" });
});

module.exports = router;
