const express = require("express");
const router = express.Router;

const {
  getCurrentController,
  loginController,
  logoutController,
  registerController,
} = require("../controllers/user");
const { asyncWrapper } = require("../helpers");
const { authenticate, validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../db");

// Signup======================================>
router.post(
  "/register",
  validateBody(registerSchema),
  asyncWrapper(registerController)
);

// Signin======================================>
router.post("/login", validateBody(loginSchema), asyncWrapper(loginController));

// Get Current=================================>
router.get("/current", authenticate, asyncWrapper(getCurrentController));

// Signout=====================================>
router.get("/logout", authenticate, asyncWrapper(logoutController));

module.exports = router;
