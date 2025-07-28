document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value;
  const senha = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(response => response.text())
    .then(texto => {
      alert(texto);

      if (texto.includes("Login bem-sucedido")) {
        // GUARDA LOGIN
        localStorage.setItem("logado", "true");
        console.log("Estado salvo: ", localStorage.getItem("logado"));

        // Aguarda a gravação e só depois redireciona
        setTimeout(() => {
          window.location.href = "/home/home.html";
        }, 200); // pequeno delay para garantir que o navegador conclua
      }
    })
    .catch(error => {
      console.error("Erro ao fazer login:", error);
      alert("Erro no servidor. Tente novamente.");
    });
});


