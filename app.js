const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index");
const mostruarioRouter = require("./routes/mostruario");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/mostruario", mostruarioRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
