const STATUS = require("../utils/statusCodes");

module.exports = (err, req, res, next) => {
  console.error(err.stack || err.message);
  const statusCodes = err.statusCodes || STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected error occurred on the server.";
  res.status(statusCodes).send({ message });
};
