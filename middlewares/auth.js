const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const STATUS = require("../utils/statusCodes");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(STATUS.UNAUTHORIZED).send({ message: "Invalid token" });
  }
};

module.exports = auth;
