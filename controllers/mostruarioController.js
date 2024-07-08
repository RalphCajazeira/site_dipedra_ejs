const path = require("path");
const fs = require("fs");

exports.getMostruario = (req, res) => {
  const dirPath = path.join(__dirname, "..", "public", "img", "mostruario");
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
};

exports.getCategoria = (req, res) => {
  const categoria = req.params.categoria;
  const dirPath = path.join(
    __dirname,
    "..",
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
      .map((file) => {
        const [tipo, nome, classificacao, estilo, ambiente] = file
          .replace(".jpg", "")
          .split("---");
        return {
          name: file,
          image: `/img/mostruario/${categoria}/${file}`,
          tipo,
          nome,
          classificacao,
          estilo,
          ambiente,
        };
      });

    res.render("pages/categoria", { categoria, images });
  });
};
