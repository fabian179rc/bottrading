const axios = require("axios");
const { SYMBOL, TIMEFRAME } = require("../config/enviroment");

async function getMovingAverage(periods) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${TIMEFRAME}&limit=${periods}`;
  const response = await axios.get(url);
  const klines = response.data;
  // Obtener los precios de cierre de cada kline
  const closes = klines.map((kline) => parseFloat(kline[4]));
  // Calcular la media móvil de X periodos
  const movingAverage =
    closes.reduce((sum, price) => sum + price) / closes.length;
  return movingAverage;
}
module.exports = { getMovingAverage };
