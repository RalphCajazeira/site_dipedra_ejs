const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

// Configurações
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/mostruario/");
  },
  filename: (req, file, cb) => {
    const { type, name, classification, style, environment } = req.body;
    const filename = `${type} --- ${name} --- ${classification} --- ${style} --- ${environment}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Rotas
app.use("/", indexRouter);
app.use("/mostruario/admin", adminRouter(upload));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
