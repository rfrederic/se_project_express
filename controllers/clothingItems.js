const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/statusCodes");

// Create
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  if (!req.user || !req.user._id) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: "Owner information is missing" });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS.CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid data provide" });
      }
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Read all
function getItems(req, res) {
  ClothingItem.find({})
    .then((items) => res.status(STATUS.OK).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
}

// Delete
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Like
const likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });

// Unlike
const unlikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
