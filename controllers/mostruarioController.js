const fs = require("fs");
const path = require("path");

exports.renderPage = (req, res) => {
  res.render("pages/mostruario");
};

exports.getFilters = (req, res) => {
  const imagePath = path.join(__dirname, "../public/img/mostruario");
  const files = fs.readdirSync(imagePath);
  const filters = {
    types: new Set(),
    names: new Set(),
    classifications: new Set(),
    styles: new Set(),
    environments: new Set(),
  };

  files.forEach((file) => {
    const parts = file.replace(".jpg", "").split(" --- ").slice(0, 5);
    if (parts.length === 5) {
      const [type, name, classification, style, environment] = parts.map(
        (part) => (part === "NULL" ? "" : part)
      );
      filters.types.add(type.replace(/-/g, " "));
      filters.names.add(name.replace(/-/g, " "));
      filters.classifications.add(classification.replace(/-/g, " "));
      filters.styles.add(style.replace(/-/g, " "));
      filters.environments.add(environment.replace(/-/g, " "));
    }
  });

  Object.keys(filters).forEach((key) => {
    filters[key] = Array.from(filters[key]).filter((value) => value !== "");
  });

  res.json(filters);
};

exports.getImages = (req, res) => {
  const imagePath = path.join(__dirname, "../public/img/mostruario");
  const files = fs.readdirSync(imagePath);
  const { category = "", filters = "" } = req.query;
  const filterArray = filters.split(",").map((filter) => filter.toLowerCase());

  const images = files
    .filter((file) => {
      const [type, name, classification, style, environment] = file
        .replace(".jpg", "")
        .split(" --- ")
        .slice(0, 5)
        .map((part) => (part === "NULL" ? "" : part));
      const fileName =
        `${type} --- ${name} --- ${classification} --- ${style} --- ${environment}`.toLowerCase();
      const matchesCategory =
        category === "" || fileName.includes(category.toLowerCase());
      const matchesFilters = filterArray.every((filter) =>
        filter.split("|").some((f) => fileName.includes(f))
      );
      return matchesCategory && matchesFilters;
    })
    .map((file) => ({
      path: `/img/mostruario/${file}`,
      name: file.replace(".jpg", "").split(" --- ")[1].replace(/-/g, " "),
    }));

  res.json(images);
};

exports.renderAdminPage = (req, res) => {
  res.render("pages/admin");
};

const getNextId = () => {
  const imagePath = path.join(__dirname, "../public/img/mostruario");
  const files = fs.readdirSync(imagePath);
  let maxId = 0;

  files.forEach((file) => {
    const idMatch = file.match(/--- (\d+)\.jpg$/);
    if (idMatch) {
      const id = parseInt(idMatch[1], 10);
      if (id > maxId) {
        maxId = id;
      }
    }
  });

  return String(maxId + 1).padStart(4, "0");
};

exports.handleUpload = (req, res) => {
  const { senha, tipo, nome, classificacao, estilo, ambiente } = req.body;
  const expectedPassword = "Dipedr@10";

  if (senha !== expectedPassword) {
    return res.status(403).send("Senha incorreta");
  }

  const fields = [tipo, nome, classificacao, estilo, ambiente].map(
    (field) => field || "NULL"
  );
  const nextId = getNextId();
  const fileName = `${fields.join(" --- ")} --- ${nextId}.jpg`;

  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado");
  }

  const uploadPath = path.join(__dirname, "../public/img/mostruario", fileName);

  // Corrigindo o problema de permissão com copyFileSync e unlinkSync
  fs.copyFileSync(req.file.path, uploadPath);
  fs.unlinkSync(req.file.path);

  res.status(200).send("Upload realizado com sucesso!");
};
