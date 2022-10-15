const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  validateBody,
  changeSubscriptionValidation,
} = require("./validationMiddleware");

const authenticate = require("./authenticate");
const uploadMiddleware = require("./uploadMiddleware.js");

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  authenticate,
  validateBody,
  changeSubscriptionValidation,
  uploadMiddleware,
};
