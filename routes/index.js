const express = require("express");
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
  res.render("pages/index");
});

// Rota para a página Quem Somos
router.get("/about", (req, res) => {
  res.render("pages/about");
});

// Rota para a página Mostruário
router.get("/mostruario", (req, res) => {
  res.render("pages/mostruario");
});

module.exports = router;
