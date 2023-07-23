const client = require("../config/binance");

const getPriceSymbol = async (symbol) => {
  return parseFloat((await client.prices({ symbol }))[symbol]);
};
module.exports = { getPriceSymbol };
