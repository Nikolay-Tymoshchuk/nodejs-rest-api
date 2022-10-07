const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { requestError } = require("../helpers");
const { SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.get("authorization") || "";
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw requestError(401);
    }
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw requestError(401, "User is unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
