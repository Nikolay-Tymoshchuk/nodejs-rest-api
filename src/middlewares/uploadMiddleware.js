const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("tmp"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}_${Date.now()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;