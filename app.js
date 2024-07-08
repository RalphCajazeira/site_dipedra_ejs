const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const app = express();

// Configuração da view engine EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Uso das rotas
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
