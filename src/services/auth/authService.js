const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { User } = require("../../db");
const { requestError } = require("../../helpers");

// Registration controller ===============================>

const register = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashedPassword });
  return result;
};

// Authorization controller ===============================>

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!user || !isPasswordCorrect) {
    throw requestError(401, "Email or password are wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "365d" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

// Logout User ============================================>

const logout = async ({ _id }) => {
  await User.findOneAndUpdate(_id, { token: "" });
};

module.exports = {
  register,
  login,
  logout,
};
