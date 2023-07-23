const client = require("../config/binance");
const { getPriceSymbol } = require("../extras/getPriceSymbol");
const { SYMBOL } = require("../config/enviroment");
const { getBalance } = require("./balance");

const buyOrder = async (amount) => {
  try {
    // Obtener el precio actual de la moneda
    const coinPrice = await getPriceSymbol(SYMBOL);

    // Calcular la cantidad de monedas a comprar
    const quantity = amount / coinPrice;

    // Verificar el saldo disponible
    const balance = await getBalance();
    const usdtBalance = balance["USDT"];

    if (usdtBalance >= amount) {
      // Realizar la orden de compra
      const order = await client.order({
        symbol: SYMBOL,
        side: "BUY",
        type: "MARKET",
        quantity: quantity.toFixed(2), // Limitar la cantidad a 2 decimales
      });

      const newUsdtBalance = usdtBalance - amount;
      console.log(`Orden de compra por ${amount} USDT realizada con éxito`);
      console.log(`Nuevo balance: ${newUsdtBalance} USDT`);

      // Aquí puedes agregar cualquier lógica adicional después de realizar la compra

      return order;
    } else {
      console.error(
        `No se puede comprar. La orden es por ${amount} USDT y el balance es de ${usdtBalance} USDT`
      );
      return { error: "Insufficient balance" }; // Devolver un objeto con el mensaje de error
    }
  } catch (error) {
    console.error("Error al realizar la orden de compra:", error);
    return { error: "Error while buying" }; // Devolver un objeto con el mensaje de error
  }
};

const sellOrder = async (amount) => {
  try {
    // Obtener el precio actual de la moneda
    const coinPrice = await getPriceSymbol(SYMBOL);

    // Calcular la cantidad de monedas a vender
    const quantity = amount / coinPrice;

    // Verificar el saldo disponible
    const balance = await getBalance();
    const symbolBalance = balance[SYMBOL];

    if (symbolBalance >= quantity) {
      // Realizar la orden de venta
      const order = await client.order({
        symbol: SYMBOL,
        side: "SELL",
        type: "MARKET",
        quantity: quantity.toFixed(2), // Limitar la cantidad a 2 decimales
      });

      const newSymbolBalance = symbolBalance - quantity;
      console.log(`Orden de venta por ${amount} USDT realizada con éxito`);
      console.log(`Nuevo balance: ${newSymbolBalance} ${SYMBOL}`);

      // Aquí puedes agregar cualquier lógica adicional después de realizar la venta

      return order;
    } else {
      console.error(
        `No se puede vender. La orden es por ${amount} USDT y el balance es de ${symbolBalance} ${SYMBOL}`
      );
      return { error: "Insufficient balance" }; // Devolver un objeto con el mensaje de error
    }
  } catch (error) {
    console.error("Error al realizar la orden de venta:", error);
    return { error: "Error while selling" }; // Devolver un objeto con el mensaje de error
  }
};

module.exports = { buyOrder, sellOrder };
