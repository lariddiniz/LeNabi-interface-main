const express = require("express");
const path = require("path");
const app = express();

// Define o diretório de arquivos estáticos como a pasta raiz
app.use(express.static(__dirname));

// Rota para servir o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para redirecionar para index.html ao acessar diretamente via http://localhost:3008
app.get("*", (req, res) => {
  if (req.originalUrl === "/" || req.originalUrl === "/index.html") {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

// Escolha automaticamente uma porta
const server = app.listen(3008, () => {
  const address = server.address();
  console.log(`Servidor rodando em http://localhost:${address.port}`);
});



