if (localStorage.getItem("logado") !== "true") {
  window.location.replace("/login/login.html");
}


// Botão: Calculadora de Lucro
document.getElementById("btnLucro").addEventListener("click", function () {
  window.location.href = "../calculadoralucro/calculadoralucro.html";
});

// Botão: Simulador de Investimento
document.getElementById("btnInvestimento").addEventListener("click", function () {
  window.location.href = "../simulador/simulador.html";
});

// Botão: Cotação e Conversão de Moedas
document.getElementById("btnCotacao").addEventListener("click", function () {
  window.location.href = "../cotacaomoedas/cotacaomoedas.html";
});

// Botão: Sair
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem("logado"); // limpa login
  window.location.replace("/login/login.html"); // substitui histórico
});
