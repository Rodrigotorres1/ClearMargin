document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  const novoUsuario = { nome, usuario: username, email, senha };

  fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoUsuario)
  })
    .then(response => response.json())
    .then(data => {
      alert("Conta criada com sucesso!");
      window.location.href = "../home/home.html";
    })
    .catch(err => {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao criar conta. Tente novamente.");
    });
});
