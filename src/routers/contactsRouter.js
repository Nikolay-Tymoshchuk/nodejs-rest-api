const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers");

// controllers
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  changeContactStatusController,
} = require("../controllers/contacts");

// middleware for validations
const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
} = require("../middlewares");

const { authenticate } = require("../middlewares");

// routers paths
router.get("/", authenticate, asyncWrapper(getContactsController));
router.get("/:contactId", authenticate, asyncWrapper(getContactByIdController));
router.post(
  "/",
  authenticate,
  addContactValidation,
  asyncWrapper(addContactController)
);
router.delete(
  "/:contactId",
  authenticate,
  asyncWrapper(deleteContactController)
);
router.put(
  "/:contactId",
  authenticate,
  updateContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  updateStatusValidation,
  asyncWrapper(changeContactStatusController)
);

module.exports = router;
