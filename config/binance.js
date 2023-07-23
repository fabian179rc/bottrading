const { APIKEY, SECRET } = require("./enviroment");

const Binance = require("binance-api-node").default;

const client = Binance({
  apiKey: APIKEY,
  apiSecret: SECRET,
  baseURL: "https://api.binance.com/api/v3/",
});

module.exports = client;
