const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

module.exports = (upload) => {
  router.get("/", adminController.renderAdminPage);
  router.post("/upload", upload.single("image"), adminController.handleUpload);

  return router;
};
