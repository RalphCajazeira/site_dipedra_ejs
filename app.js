const express = require("express");
const path = require("path");

const app = express();

// Definindo o motor de visualização como EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota para a página inicial
app.get("/", (req, res) => {
  res.render("pages/index");
});

// Rota para a página "Quem Somos"
app.get("/about", (req, res) => {
  res.render("pages/about");
});

// Rota para a página "Mostruário"
app.get("/mostruario", (req, res) => {
  res.render("pages/mostruario");
});

// Iniciando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
