const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  validateBody,
} = require("./validationMiddleware");

const authenticate = require("./authenticate");

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  authenticate,
  validateBody,
};
