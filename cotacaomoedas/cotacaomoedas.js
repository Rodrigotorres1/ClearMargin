let cotacaoDolar = 0;

// Buscar cotação atual do dólar
async function buscarCotacao() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const data = await response.json();
    cotacaoDolar = parseFloat(data.USDBRL.bid);
    document.getElementById("dolar-value").innerText = `R$ ${cotacaoDolar.toFixed(2)}`;
  } catch (error) {
    document.getElementById("dolar-value").innerText = "Erro ao buscar";
    console.error("Erro ao buscar cotação:", error);
  }
}

// Conversões
function converterParaReal() {
  if (cotacaoDolar === 0) return;
  const valorDolar = parseFloat(document.getElementById("dolar").value);
  if (!isNaN(valorDolar)) {
    const resultado = valorDolar * cotacaoDolar;
    document.getElementById("real").value = resultado.toFixed(2);
  }
}

function converterParaDolar() {
  if (cotacaoDolar === 0) return;
  const valorReal = parseFloat(document.getElementById("real").value);
  if (!isNaN(valorReal)) {
    const resultado = valorReal / cotacaoDolar;
    document.getElementById("dolar").value = resultado.toFixed(2);
  }
}

// Inicializa
buscarCotacao();
setInterval(buscarCotacao, 300000); // atualiza a cada 5 minutos
