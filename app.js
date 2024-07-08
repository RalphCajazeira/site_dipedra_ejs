const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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

// API para o mostruário
app.get("/api/mostruario", (req, res) => {
  const fs = require("fs");
  const path = require("path");
  const dirPath = path.join(__dirname, "public", "img", "mostruario");

  fs.readdir(dirPath, (err, folders) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directories" });
    }

    const categories = folders.map((folder) => ({
      name: folder,
      image: `/img/mostruario/${folder}/${folder}.jpg`,
    }));

    res.json(categories);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
