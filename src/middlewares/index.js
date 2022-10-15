const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  validateBody,
  changeSubscriptionValidation,
} = require("./validationMiddleware");

const authenticate = require("./authenticate");

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  authenticate,
  validateBody,
  changeSubscriptionValidation,
};
