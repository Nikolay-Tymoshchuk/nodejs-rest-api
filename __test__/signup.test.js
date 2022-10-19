const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { loginController } = require("../src/controllers/user");
const { User } = require("../src/db");
