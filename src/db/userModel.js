const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);
