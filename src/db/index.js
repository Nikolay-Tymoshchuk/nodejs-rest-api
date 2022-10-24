const connectMongo = require("./connection.js");
const Contact = require("./models/contactModel");
const {
  loginSchema,
  registerSchema,
  User,
  verifyEmailSchema,
} = require("./models/userModel");

module.exports = {
  connectMongo,
  Contact,
  loginSchema,
  registerSchema,
  User,
  verifyEmailSchema,
};
