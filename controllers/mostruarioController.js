const fs = require("fs");
const path = require("path");

const getCategories = (req, res) => {
  const categoriesDir = path.join(__dirname, "../public/img/mostruario");
  fs.readdir(categoriesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Erro ao listar categorias");
    }
    const categories = files.filter((file) =>
      fs.lstatSync(path.join(categoriesDir, file)).isDirectory()
    );
    res.json(categories);
  });
};

const getFilters = (req, res) => {
  const categoriesDir = path.join(__dirname, "../public/img/mostruario");
  const filters = {
    "Tipo da Pedra": [],
    "Nome da Pedra": [],
    "Classificação da Pedra": [],
    "Estilo do Produto": [],
    Ambiente: [],
  };

  fs.readdir(categoriesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Erro ao listar filtros");
    }

    files.forEach((category) => {
      const categoryPath = path.join(categoriesDir, category);
      if (fs.lstatSync(categoryPath).isDirectory()) {
        fs.readdir(categoryPath, (err, images) => {
          if (err) return;
          images.forEach((image) => {
            const [tipo, nome, classificacao, estilo, ambiente] = image
              .replace(".jpg", "")
              .split(" --- ");
            if (!filters["Tipo da Pedra"].includes(tipo))
              filters["Tipo da Pedra"].push(tipo);
            if (!filters["Nome da Pedra"].includes(nome))
              filters["Nome da Pedra"].push(nome);
            if (!filters["Classificação da Pedra"].includes(classificacao))
              filters["Classificação da Pedra"].push(classificacao);
            if (!filters["Estilo do Produto"].includes(estilo))
              filters["Estilo do Produto"].push(estilo);
            if (!filters["Ambiente"].includes(ambiente))
              filters["Ambiente"].push(ambiente);
          });
        });
      }
    });
    res.json(filters);
  });
};

module.exports = {
  getCategories,
  getFilters,
};
