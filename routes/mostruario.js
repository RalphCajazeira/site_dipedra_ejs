const express = require("express");
const router = express.Router();
const mostruarioController = require("../controllers/mostruarioController");

router.get("/mostruario", mostruarioController.getCategories);
router.get("/mostruario/filters", mostruarioController.getFilters);

module.exports = router;
