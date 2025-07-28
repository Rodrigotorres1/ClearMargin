const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // Importa o bcrypt
const app = express();
const port = 3000;
const saltRounds = 10; // Número de rounds para o hash

// Banco de dados SQLite
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
app.use(express.static(__dirname));

// Página inicial -> login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login/login.html');
});


// 🔐 Rota de cadastro com criptografia
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      console.error("Erro ao criptografar senha:", err);
      return res.status(500).send("Erro interno.");
    }

    db.run(
      `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, email, hash],
      function (err) {
        if (err) {
          console.error("Erro ao salvar no banco:", err);
          return res.status(500).send("Erro ao cadastrar.");
        }
        res.send("Usuário cadastrado com sucesso!");
      }
    );
  });
});


// 🔐 Rota de login comparando com senha criptografada
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, row) => {
    if (err) return res.status(500).send("Erro ao buscar no banco.");
    if (!row) return res.status(401).send("Email ou senha incorretos.");

    bcrypt.compare(senha, row.senha, (err, result) => {
      if (err) return res.status(500).send("Erro ao verificar senha.");
      if (!result) return res.status(401).send("Email ou senha incorretos.");
      res.send("Login bem-sucedido!");
    });
  });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
