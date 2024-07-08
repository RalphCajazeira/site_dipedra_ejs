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
    const parts = file.replace(".jpg", "").split(" --- ");
    if (parts.length === 5) {
      const [type, name, classification, style, environment] = parts;
      filters.types.add(type.replace(/-/g, " "));
      filters.names.add(name.replace(/-/g, " "));
      filters.classifications.add(classification.replace(/-/g, " "));
      filters.styles.add(style.replace(/-/g, " "));
      filters.environments.add(environment.replace(/-/g, " "));
    }
  });

  Object.keys(filters).forEach((key) => {
    filters[key] = Array.from(filters[key]);
  });

  res.json(filters);
};

exports.getImages = (req, res) => {
  const imagePath = path.join(__dirname, "../public/img/mostruario");
  const files = fs.readdirSync(imagePath);
  const { category = "", filters = "" } = req.query;
  const filterArray = filters.split(",");

  const images = files
    .filter((file) => {
      const [type, name, classification, style, environment] = file
        .replace(".jpg", "")
        .split(" --- ");
      const fileName =
        `${type} --- ${name} --- ${classification} --- ${style} --- ${environment}`.toLowerCase();
      const matchesCategory =
        category === "" || fileName.includes(category.toLowerCase());
      const matchesFilters = filterArray.every((filter) =>
        fileName.includes(filter.toLowerCase())
      );
      return matchesCategory && matchesFilters;
    })
    .map((file) => ({
      path: `/img/mostruario/${file}`,
      name: file.replace(".jpg", "").split(" --- ")[1].replace(/-/g, " "),
    }));

  res.json(images);
};
