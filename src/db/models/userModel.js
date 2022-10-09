const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password minimal length is 4 symbols"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  subscription: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const User = model("user", userSchema);

module.exports = {
  loginSchema,
  registerSchema,
  User,
};
