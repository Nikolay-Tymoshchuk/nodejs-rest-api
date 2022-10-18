const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file :>> ", file);
    cb(null, path.join(__dirname, "../../", "tmp"));
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
