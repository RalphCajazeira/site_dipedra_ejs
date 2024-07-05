const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/catalog", (req, res) => {
  res.render("pages/catalog");
});

module.exports = router;
