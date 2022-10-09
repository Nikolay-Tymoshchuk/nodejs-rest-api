const express = require("express");
const router = express.Router();

const {
  getCurrentController,
  loginController,
  logoutController,
  registerController,
  changeSubscriptionController,
} = require("../controllers/user");
const { asyncWrapper } = require("../helpers");
const {
  authenticate,
  validateBody,
  changeSubscriptionValidation,
} = require("../middlewares");
const { registerSchema, loginSchema } = require("../db");

// Signup======================================>
router.post(
  "/signup",
  validateBody(registerSchema),
  asyncWrapper(registerController)
);

// Signin======================================>
router.post("/login", validateBody(loginSchema), asyncWrapper(loginController));

// Get Current=================================>
router.get("/current", authenticate, asyncWrapper(getCurrentController));

// Signout=====================================>
router.get("/logout", authenticate, asyncWrapper(logoutController));

// Refresh subscription========================>
router.patch(
  "/users/:userId",
  authenticate,
  changeSubscriptionValidation,
  asyncWrapper(changeSubscriptionController)
);

module.exports = router;
