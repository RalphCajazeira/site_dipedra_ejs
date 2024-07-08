const express = require("express");
const router = express.Router();
const mostruarioController = require("../controllers/mostruarioController");

// Rota para a página Mostruário
router.get("/mostruario", (req, res) => {
  res.render("pages/mostruario");
});

// Rota para a página About
router.get("/about", (req, res) => {
  res.render("pages/about");
});

// Rota para a página Home
router.get("/", (req, res) => {
  res.render("pages/index");
});

// Rotas para a API do Mostruário
router.get("/api/mostruario/filters", mostruarioController.getFilters);
router.get("/api/mostruario", mostruarioController.getCategories);

module.exports = router;
