const express = require("express");
const path = require("path");
const app = express();

// Configuração da view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração do diretório público
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", require("./routes/index"));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
