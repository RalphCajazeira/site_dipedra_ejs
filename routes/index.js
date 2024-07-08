const express = require("express");
const router = express.Router();
const path = require("path");

// Controladores
const mostruarioController = require("../controllers/mostruarioController");

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

// API para carregar categorias e filtros
router.get("/api/mostruario", mostruarioController.getCategories);
router.get("/api/mostruario/filters", mostruarioController.getFilters);

module.exports = router;
