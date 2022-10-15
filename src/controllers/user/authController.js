const {
  login,
  logout,
  register,
  changeSubscription,
} = require("../../services/auth");

// Registration controller ===============================>

const registerController = async (req, res) => {
  const result = await register(req.body);
  res.status(201).json({
    subscription: result.subscription,
    email: result.email,
  });
};

// Authorization controller ===============================>

const loginController = async (req, res) => {
  const token = await login(req.body);
  res.json({
    token,
  });
};

// Get current user data ==================================>

const getCurrentController = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    subscription,
    email,
  });
};

// Logout User ============================================>

const logoutController = async (req, res) => {
  await logout(req.user);
  res.json({
    message: "Logout successful",
  });
};

const changeSubscriptionController = async (req, res) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  const result = await changeSubscription(userId, subscription);
  res.status(200).json({
    message: `Subscription of contact ${userId} was successfully updated`,
    new_subscription_status: result,
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  changeSubscriptionController,
};
