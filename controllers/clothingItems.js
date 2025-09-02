const ClothingItem = require("../models/ClothingItem");
const STATUS = require("../utils/statusCodes");

// Create
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: "Owner information is missing" });
  }

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS.CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid data provide" });
      }
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Read all
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS.OK).send(items))
    .catch((err) => {
      console.error(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Delete
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then(() => res.status(STATUS.NO_CONTENT).send({}))
    .orFail()
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      // Invalid ID format
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      // Other server Errors
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Like
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .orFail()
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      // Invalid ID format
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      // Other server Errors
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

// Unlike
const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )

    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .orFail()
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS.NOT_FOUND).send({ message: "Item not found" });
      }
      // Invalid ID format
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid Item ID" });
      }
      // Other server Errors
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
