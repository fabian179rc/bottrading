const WebSocket = require("ws");
const { SYMBOL, TIMEFRAME } = require("../config/enviroment");
const { funcionAccion } = require("../funcionAccion");

let previousCandleCloseTime = null;

const getPriceBaseClose = () => {
  const websocketEndpoint = `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@kline_${TIMEFRAME}`;

  const ws = new WebSocket(websocketEndpoint);

  ws.on("open", () => {
    console.log(`Connected to ${websocketEndpoint}`);
  });

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // Verifica si es un mensaje de actualización de precio
    if (data.k && data.k.t && data.k.c) {
      const candleCloseTime = data.k.t;
      const candleClosePrice = parseFloat(data.k.c);

      if (
        previousCandleCloseTime &&
        candleCloseTime > previousCandleCloseTime
      ) {
        console.log(
          `Close price for ${SYMBOL} at ${new Date(
            previousCandleCloseTime
          )}: ${candleClosePrice}`
        );
        funcionAccion();
        // Aquí puedes realizar cualquier acción adicional cuando se cierre la vela
      }

      previousCandleCloseTime = candleCloseTime;
    }
  });
};

module.exports = { getPriceBaseClose };
