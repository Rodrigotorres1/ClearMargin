const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Banco de dados
const db = new sqlite3.Database('./usuarios.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
  )`);
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve os arquivos HTML e JS

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  db.run(`INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senha],
    function (err) {
      if (err) return res.status(500).send("Erro ao cadastrar");
      res.send("Usuário cadastrado com sucesso!");
    });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(`SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
    [email, senha],
    (err, row) => {
      if (err) return res.status(500).send("Erro no login");
      if (row) return res.send("Login bem-sucedido!");
      res.status(401).send("Email ou senha incorretos");
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login/login.html');
});

