if (localStorage.getItem("logado") !== "true") {
  window.location.replace("/login/login.html");
}
function alternarModo() {
  const modo = document.getElementById("modo").value;
  document.getElementById("inputMargem").style.display = modo === "margem" ? "block" : "none";
  document.getElementById("inputPreco").style.display = modo === "preco" ? "block" : "none";
  document.getElementById("resultado").innerHTML = "";
}

function calcular() {
  const custoDolar = parseFloat(document.getElementById("custoDolar").value);
  const cotacao = parseFloat(document.getElementById("cotacao").value);
  const modo = document.getElementById("modo").value;

  if (isNaN(custoDolar) || isNaN(cotacao)) {
    alert("Preencha o custo e a cotação corretamente.");
    return;
  }

  const custoTotal = custoDolar * cotacao;

  if (modo === "margem") {
    const margem = parseFloat(document.getElementById("margem").value);
    if (isNaN(margem)) {
      alert("Informe a margem corretamente.");
      return;
    }

    const precoVenda = custoTotal * (1 + margem / 100);
    const lucro = precoVenda - custoTotal;

    const resultadoHTML =
      `<strong>Preço sugerido:</strong> R$ ${precoVenda.toFixed(2)}<br>` +
      `<strong>Lucro estimado:</strong> R$ ${lucro.toFixed(2)}<br>` +
      `<strong>Margem:</strong> ${margem.toFixed(2)}%`;

    localStorage.setItem("resultadoLucro", resultadoHTML);
    window.location.href = "resultado.html";

  } else if (modo === "preco") {
    const precoVenda = parseFloat(document.getElementById("precoVenda").value);
    if (isNaN(precoVenda)) {
      alert("Informe o preço de venda corretamente.");
      return;
    }

    const lucro = precoVenda - custoTotal;
    const margem = (lucro / custoTotal) * 100;

    const resultadoHTML =
      `<strong>Lucro estimado:</strong> R$ ${lucro.toFixed(2)}<br>` +
      `<strong>Margem de lucro:</strong> ${margem.toFixed(2)}%`;

    localStorage.setItem("resultadoLucro", resultadoHTML);
    window.location.href = "resultado.html";
  }
}
