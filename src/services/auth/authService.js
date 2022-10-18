const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { User } = require("../../db");
const { requestError } = require("../../helpers");
const gravatar = require("gravatar");

// Registration controller ===============================>

const register = async ({ email, password, subscription = "" }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", d: "robohash" });
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    subscription,
  });
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

// Change User subscription type ==========================>
const changeSubscription = async (id, subType) => {
  await User.findOneAndUpdate(id, { subscription: `${subType}` });
  return subType;
};

module.exports = {
  register,
  login,
  logout,
  changeSubscription,
};
