const express = require("express");
const router = express.Router();
const mostruarioController = require("../controllers/mostruarioController");

router.get("/", mostruarioController.renderPage);
router.get("/api/filters", mostruarioController.getFilters);
router.get("/api/images", mostruarioController.getImages);

module.exports = router;
