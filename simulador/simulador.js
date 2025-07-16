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
  const taxaAnual = parseFloat(document.getElementById("taxa").value); // <-- sem máscara
  const tempoAnos = parseFloat(document.getElementById("tempo").value); // <-- sem máscara

  const resultado = document.getElementById("resultado");

  if (aporteInicial <= 0 || taxaAnual <= 0 || tempoAnos <= 0) {
    resultado.textContent = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  const meses = tempoAnos * 12;
  const taxaMensal = (1 + taxaAnual / 100) ** (1 / 12) - 1;

  let valorFinal = aporteInicial * Math.pow(1 + taxaMensal, meses);

  for (let i = 1; i <= meses; i++) {
    valorFinal += aporteMensal * Math.pow(1 + taxaMensal, meses - i);
  }

  const totalInvestido = aporteInicial + (aporteMensal * meses);
  const rendimento = valorFinal - totalInvestido;

  const formatar = valor => valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  resultado.textContent =
    `Valor Final: ${formatar(valorFinal)}\n` +
    `Total Investido: ${formatar(totalInvestido)}\n` +
    `Rendimento: ${formatar(rendimento)}`;
}

// Aplica máscara APENAS nos campos de dinheiro
document.addEventListener("DOMContentLoaded", () => {
  aplicarMascaraMonetaria(document.getElementById("aporteInicial"));
  aplicarMascaraMonetaria(document.getElementById("aporteMensal"));
  // Taxa e Tempo ficam SEM máscara
});
