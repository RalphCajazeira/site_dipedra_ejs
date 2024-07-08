const path = require("path");
const fs = require("fs");

const getCategories = (req, res) => {
  const directoryPath = path.join(__dirname, "../public/img/mostruario");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }

    const images = files.filter((file) => {
      return (
        file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")
      );
    });

    res.json(images);
  });
};

const getFilters = (req, res) => {
  const directoryPath = path.join(__dirname, "../public/img/mostruario");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }

    const filters = {
      tipoPedra: new Set(),
      nomePedra: new Set(),
      classificacaoPedra: new Set(),
      estiloProduto: new Set(),
      ambiente: new Set(),
    };

    files.forEach((file) => {
      const parts = file.split(" --- ");
      if (parts.length === 5) {
        const [tipo, nome, classificacao, estilo, ambiente] = parts;
        if (tipo) filters.tipoPedra.add(tipo.trim());
        if (nome) filters.nomePedra.add(nome.trim());
        if (classificacao) filters.classificacaoPedra.add(classificacao.trim());
        if (estilo) filters.estiloProduto.add(estilo.trim());
        if (ambiente) filters.ambiente.add(ambiente.trim());
      }
    });

    res.json({
      tipoPedra: Array.from(filters.tipoPedra),
      nomePedra: Array.from(filters.nomePedra),
      classificacaoPedra: Array.from(filters.classificacaoPedra),
      estiloProduto: Array.from(filters.estiloProduto),
      ambiente: Array.from(filters.ambiente),
    });
  });
};

module.exports = { getCategories, getFilters };
