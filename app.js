const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/index");
const mostruarioRouter = require("./routes/mostruario");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/mostruario", mostruarioRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
