const { login, logout, register } = require("../../services/auth");

// Registration controller ===============================>

const registerController = async (req, res) => {
  const result = await register(req.body);
  res.status(201).json({
    name: result.name,
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
  const { name, email } = req.user;
  res.json({
    name,
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

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
};
