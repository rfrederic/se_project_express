const STATUS = require("../utils/statusCodes");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.FORBIDDEN;
  }
}
module.exports = ForbiddenError;
