const STATUS = require("../utils/statusCodes");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.CONFLICT;
  }
}
module.exports = ConflictError;
