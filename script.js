function calcular() {
  const custoDolar = parseFloat(document.getElementById("custoDolar").value);
  const cotacao = parseFloat(document.getElementById("cotacao").value);
  const margem = parseFloat(document.getElementById("margem").value);

  if (isNaN(custoDolar) || isNaN(cotacao) || isNaN(margem)) {
    document.getElementById("resultado").innerHTML = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  const custoTotal = custoDolar * cotacao;
  const precoVenda = custoTotal * (1 + margem / 100);
  const lucro = precoVenda - custoTotal;

  document.getElementById("resultado").innerHTML =
    `<strong>Preço sugerido:</strong> R$ ${precoVenda.toFixed(2)}<br>` +
    `<strong>Lucro estimado:</strong> R$ ${lucro.toFixed(2)}<br>` +
    `<strong>Margem:</strong> ${margem.toFixed(2)}%`;
}
