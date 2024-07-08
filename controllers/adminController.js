exports.renderAdminPage = (req, res) => {
  res.render("pages/admin");
};

exports.handleUpload = (req, res) => {
  const { password } = req.body;

  if (password !== "Dipedr@10") {
    return res.status(401).send("Senha incorreta!");
  }

  if (!req.file) {
    return res.status(400).send("Nenhuma imagem foi enviada!");
  }

  res.send("Upload realizado com sucesso!");
};
