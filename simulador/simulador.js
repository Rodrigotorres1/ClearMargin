// Desformata valores tipo "1.000,00" → 1000.00
function desformatar(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
}

// Formata para padrão BRL: 1234.56 → "1.234,56"
function formatarParaBRL(valor) {
  const num = desformatar(valor);
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Máscara em tempo real para campos monetários
function aplicarMascaraMonetaria(input) {
  input.addEventListener('input', () => {
    let valor = input.value.replace(/\D/g, '');
    if (valor === '') {
      input.value = '';
      return;
    }
    valor = (parseFloat(valor) / 100).toFixed(2);
    valor = valor
      .toString()
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    input.value = valor;
  });
}

// Cálculo do investimento
function simularInvestimento() {
  const aporteInicial = desformatar(document.getElementById("aporteInicial").value);
  const aporteMensal = desformatar(document.getElementById("aporteMensal").value);
  const taxaAnual = parseFloat(document.getElementById("taxa").value);
  const tempoAnos = parseFloat(document.getElementById("tempo").value);

  if (aporteInicial <= 0 || taxaAnual <= 0 || tempoAnos <= 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const taxaMensal = (1 + taxaAnual / 100) ** (1 / 12) - 1;
  const meses = tempoAnos * 12;

  let saldoInvestido = aporteInicial;
  let saldoPoupanca = aporteInicial;

  const investimentoPorAno = [saldoInvestido];
  const poupancaPorAno = [saldoPoupanca];

  for (let mes = 1; mes <= meses; mes++) {
    saldoInvestido = saldoInvestido * (1 + taxaMensal) + aporteMensal;
    saldoPoupanca += aporteMensal;

    if (mes % 12 === 0) {
      investimentoPorAno.push(saldoInvestido);
      poupancaPorAno.push(saldoPoupanca);
    }
  }

  // Armazena os dados do gráfico
  localStorage.setItem("graficoInvestimento", JSON.stringify({
    investimento: investimentoPorAno,
    poupanca: poupancaPorAno,
    anos: tempoAnos
  }));

  // Se não houver aporte mensal, calcular a perda de poder de compra futura
  if (aporteMensal === 0) {
    const taxaInflacao = 0.03; // Meta contínua de inflação (3% ao ano)
    const valorCorrigido = aporteInicial / Math.pow(1 + taxaInflacao, tempoAnos);
    const perda = aporteInicial - valorCorrigido;

    localStorage.setItem("perdaInflacao", JSON.stringify({
      valorCorrigido,
      perda,
      taxaInflacao,
      anos: tempoAnos
    }));
  } else {
    // Limpa dados antigos se o usuário passou a fazer aportes
    localStorage.removeItem("perdaInflacao");
  }

  window.location.href = "resultado-investimento.html";
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarMascaraMonetaria(document.getElementById("aporteInicial"));
  aplicarMascaraMonetaria(document.getElementById("aporteMensal"));
  // Taxa e Tempo ficam SEM máscara
});
