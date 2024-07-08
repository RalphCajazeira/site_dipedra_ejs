const express = require("express");
const router = express.Router();
const mostruarioController = require("../controllers/mostruarioController");

router.get("/", (req, res) => {
  res.render("pages/mostruario");
});

router.get("/api/mostruario", mostruarioController.getCategories);
router.get("/api/mostruario/filters", mostruarioController.getFilters);

module.exports = router;
