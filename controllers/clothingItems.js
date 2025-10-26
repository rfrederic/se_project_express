const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/statusCodes");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

// CREATE
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return next(new UnauthorizedError("Authorization required"));
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(STATUS.CREATED).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

// READ ALL
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS.OK).send(items))
    .catch((err) => next(err));
};

// DELETE
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("You are not allowed to delete this item");
      }

      return item
        .deleteOne()
        .then(() =>
          res.status(STATUS.OK).send({ message: "Item deleted successfully" })
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      }
      return next(err);
    });
};

// LIKE
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      }
      return next(err);
    });
};

// UNLIKE
const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(STATUS.OK).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Item ID"));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
