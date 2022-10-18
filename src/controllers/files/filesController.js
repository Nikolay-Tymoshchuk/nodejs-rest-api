const path = require("path");
const fs = require("fs/promises");

const uploadController = async (req, res) => {
  res.json({ status: "success" });
};

const getFileController = async (req, res) => {
  const { fileName } = req.params;
  const pathToFile = path.join("avatars", fileName);
  const file = await fs.readFile(pathToFile);
  res.send(file);
};

module.exports = { uploadController, getFileController };
