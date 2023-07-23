const client = require("../config/binance");
const assets = require("../extras/getassets");
const { getPriceSymbol } = require("../extras/getPriceSymbol");

const getBalance = async () => {
  const { balances } = await client.accountInfo();
  const _balances = balances.filter((coin) => assets.includes(coin.asset));
  const parsedBalances = {};
  const bnbPrice = await getPriceSymbol("BNBUSDT"); // Obtener el precio actual de BNB en USDT

  _balances.forEach(async (coin) => {
    const { asset, free } = coin;
    let balance = parseFloat(free);

    if (asset === "BNB") {
      // Convertir el saldo de BNB a USDT utilizando el precio del BNB en USDT
      balance *= bnbPrice;
      balance = parseFloat(balance.toFixed(2)); // Redondear el saldo a dos decimales y convertirlo a número
      balance = `${balance} usdt`; // Agregar el texto "usdt" al saldo de BNB
    }

    parsedBalances[asset] = balance;
  });

  return parsedBalances;
};

module.exports = { getBalance };
