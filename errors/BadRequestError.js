const STATUS = require("../utils/statusCodes");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.BAD_REQUEST;
  }
}
module.exports = BadRequestError;
