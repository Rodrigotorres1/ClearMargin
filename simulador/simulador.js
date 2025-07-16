function simularInvestimento() {
  const valor = parseFloat(document.getElementById('valor').value);
  const taxa = parseFloat(document.getElementById('taxa').value) / 100; // anual
  const tempo = parseInt(document.getElementById('tempo').value); // em anos

  const resultado = document.getElementById('resultado');

  if (isNaN(valor) || isNaN(taxa) || isNaN(tempo)) {
    resultado.innerText = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  // Fórmula de juros compostos: M = P * (1 + i)^n
  const montante = valor * Math.pow(1 + taxa, tempo);
  const ganho = montante - valor;

  resultado.innerText =
    `Montante final: R$ ${montante.toFixed(2)}\nGanho total: R$ ${ganho.toFixed(2)}`;
}
