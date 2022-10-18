const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../helpers");
const { uploadMiddleware } = require("../middlewares");
const { uploadController, getFileController } = require("../controllers/files");

// POST  /api/avatars
router.post(
  "/",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadController)
);

router.get("/:fileName", asyncWrapper(getFileController));

module.exports = router;
