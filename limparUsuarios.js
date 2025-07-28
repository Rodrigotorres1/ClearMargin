// limparUsuarios.js
const sqlite3 = require('sqlite3').verbose();

// Abre o banco de dados
const db = new sqlite3.Database('./usuarios.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco:', err.message);
    return;
  }
});

// Apaga todos os usuários
db.run('DELETE FROM usuarios', function (err) {
  if (err) {
    console.error('Erro ao deletar usuários:', err.message);
  } else {
    console.log(`✅ Todos os usuários foram deletados com sucesso.`);
  }
});

// (Opcional) Zera o contador de IDs
db.run("DELETE FROM sqlite_sequence WHERE name='usuarios'", function (err) {
  if (err) {
    console.error('Erro ao resetar o contador de IDs:', err.message);
  } else {
    console.log('🧹 Contador de IDs resetado com sucesso.');
  }
  
  db.close(); // Fecha o banco
});
