const {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  changeSubscriptionController,
} = require("./authController");
const {
  verifyController,
  resendVerifyController,
} = require("./verifyController");

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  changeSubscriptionController,
  verifyController,
  resendVerifyController,
};
