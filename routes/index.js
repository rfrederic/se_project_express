const router = require("express").Router();
const clothingItem = require("./clothingItems");
const STATUS = require("../utils/statusCodes");

router.use("/items", clothingItem);

router.use((req, res) => {
  res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: "Router not found" });
});

module.exports = router;
