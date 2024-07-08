const express = require("express");
const path = require("path");
const fs = require("fs");
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
  const dirPath = path.join(__dirname, "public", "img", "mostruario");
  const defaultImage = "/img/semImagem.png";

  fs.readdir(dirPath, (err, folders) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directories" });
    }

    const categories = folders.map((folder) => {
      const imagePath = path.join(dirPath, folder, "Capa.jpg");
      const image = fs.existsSync(imagePath)
        ? `/img/mostruario/${folder}/Capa.jpg`
        : defaultImage;

      return {
        name: folder,
        image: image,
      };
    });

    res.json(categories);
  });
});

// Rota para cada categoria do mostruário
app.get("/mostruario/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const dirPath = path.join(
    __dirname,
    "public",
    "img",
    "mostruario",
    categoria
  );

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read files" });
    }

    const images = files
      .filter((file) => file !== "Capa.jpg")
      .map((file) => ({
        name: file,
        image: `/img/mostruario/${categoria}/${file}`,
      }));

    res.render("pages/categoria", { categoria, images });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
