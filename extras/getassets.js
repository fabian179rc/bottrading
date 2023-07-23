const { SYMBOL } = require("../config/enviroment");

const assets = [SYMBOL.slice(0, -4), SYMBOL.slice(-4)];

module.exports = assets;
