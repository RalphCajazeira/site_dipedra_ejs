const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mostruarioController = require("../controllers/mostruarioController");

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/mostruario", mostruarioController.renderPage);
router.get("/mostruario/admin", mostruarioController.renderAdminPage);
router.post(
  "/mostruario/upload",
  upload.single("imagem"),
  mostruarioController.handleUpload
);

router.get("/api/mostruario/filters", mostruarioController.getFilters);
router.get("/api/mostruario/images", mostruarioController.getImages);

module.exports = router;
