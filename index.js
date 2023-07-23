const { getPriceBaseClose } = require("./utils/getPriceSymbolClose");
const { PORT } = require("./config/enviroment");
const { buyOrder, sellOrder } = require("./utils/orderBuySell");
const client = require("./config/binance");
const express = require("express");
const { funcionAccion } = require("./funcionAccion");
const app = express();

//inicio websocket
// buyOrder(10);
// sellOrder(11);
// getPriceBaseClose();
funcionAccion();
// client
//   .accountInfo()
//   .then((response) => {
//     const balances = response.balances;
//     for (const balance of balances) {
//       console.log(`${balance.asset}: ${balance.free}`);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
app.listen(PORT, () => console.log("server listening on port", PORT));

//monto compra, como vender lo comprado.
//funciones compra venta (par compra, cantidad) funcion cuando comprar
