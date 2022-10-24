const { User } = require("../../db/models/userModel");

const { requestError } = require("../../helpers/requestError");
const { emailVerify } = require("../../helpers");

const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw requestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

const resendVerifyController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(404, "User not found");
  }
  if (user.verify) {
    throw requestError(400, "Verification has already been passed");
  }

  await emailVerify(email, user.verificationToken);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = { verifyController, resendVerifyController };
