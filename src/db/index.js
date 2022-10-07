const connectMongo = require("./connection.js");
const Contact = require("./contactModel");
const { loginSchema, registerSchema, User } = require("./userModel");

module.exports = { connectMongo, Contact, loginSchema, registerSchema, User };
