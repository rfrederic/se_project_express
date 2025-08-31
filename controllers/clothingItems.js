const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/statusCodes");

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body; // match schema

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.status(STATUS.CREATED).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from createItem", error: e.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS.OK).send(items))
    .catch((e) => {
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems", error: e.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body; // match schema

  console.log(itemId, imageUrl);

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }, { new: true })
    .orFail()
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((e) => {
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from updateItem", error: e.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(STATUS.NO_CONTENT).send({}))
    .catch((e) => {
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "Error from deleteItem", error: e.message });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
