const express = require("express");
const path = require("path");
const mostruarioController = require("./controllers/mostruarioController");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/mostruario", (req, res) => {
  res.render("pages/mostruario");
});

app.get("/api/mostruario", mostruarioController.getMostruario);

app.get("/mostruario/:categoria", mostruarioController.getCategoria);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
