const express = require("express");
const router = express.Router();
const mostruarioController = require("../controllers/mostruarioController");

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/mostruario", mostruarioController.renderPage);
router.get("/api/mostruario/filters", mostruarioController.getFilters);
router.get("/api/mostruario/images", mostruarioController.getImages);

router.get("/about", (req, res) => {
  res.render("pages/about");
});

module.exports = router;
