const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../helpers");
const { uploadMiddleware } = require("../middlewares");
const { uploadController } = require("../controllers/files");

// POST  /api/avatars
router.post(
  "/",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadController)
);

module.exports = router;
