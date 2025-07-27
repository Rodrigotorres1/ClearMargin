document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("username").value;
  const senha = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Login bem-sucedido!");
        window.location.href = "../home/home.html";
      } else {
        alert("Usuário ou senha inválidos.");
      }
    })
    .catch(error => {
      console.error("Erro ao fazer login:", error);
      alert("Erro no servidor. Tente novamente.");
    });
});
