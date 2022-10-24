const express = require("express");
const router = express.Router();

const {
  getCurrentController,
  loginController,
  logoutController,
  registerController,
  changeSubscriptionController,
  verifyController,
  resendVerifyController,
} = require("../controllers/user");
const { asyncWrapper } = require("../helpers");
const {
  authenticate,
  validateBody,
  changeSubscriptionValidation,
  uploadMiddleware,
} = require("../middlewares");
const { registerSchema, loginSchema, verifyEmailSchema } = require("../db");
const { updateAvatar } = require("../controllers/avatars");

// Signup======================================>
router.post(
  "/signup",
  validateBody(registerSchema),
  asyncWrapper(registerController)
);

// Verification================================>
router.get("/verify/:verificationToken", asyncWrapper(verifyController));

// Reverification================================>
router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  asyncWrapper(resendVerifyController)
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

// Update avatar===============================>
router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatar)
);

module.exports = router;
