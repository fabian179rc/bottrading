require("dotenv").config();

module.exports = {
  APIKEY: process.env.APIKEY,
  SECRET: process.env.SECRET,
  SYMBOL: process.env.SYMBOL,
  TIMEFRAME: process.env.TIMEFRAME,
  PORT: process.env.PORT,
};
