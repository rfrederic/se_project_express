const ClothingItem = require("../models/ClothingItem");
const STATUS = require("../utils/statusCodes");

// Create
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(400).send({ message: "Owner information is missing" });
  }

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS.CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err);
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

// Update
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }, { new: true })
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
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
    .orFail()
    .then(() => res.status(STATUS.NO_CONTENT).send({}))
    .catch((err) => {
      console.error(err);
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
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
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
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
