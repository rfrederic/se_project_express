const STATUS = require("../utils/statusCodes");

module.exports = (err, req, res, next) => {
  console.error(err.stack || err.message);

  const statusCode = err.statusCode || STATUS.INTERNAL_SERVER_ERROR;

  const message = err.message || "An unexpected error occurred on the server.";

  res.status(statusCode).send({ message });
};
