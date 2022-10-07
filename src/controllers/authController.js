const bcrypt = require("bcryptjs");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};
