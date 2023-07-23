const client = require("./config/binance");
const { getMovingAverage } = require("./utils/MediaMovil");
const { getBalance } = require("./utils/balance");

async function funcionAccion() {
  // const mm200 = await getMovingAverage(200);
  // const mm10 = await getMovingAverage(10);
  const balance = await getBalance();
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
  console.log(balance);
  // console.log({ mm200, mm10, balance });
}

module.exports = { funcionAccion };
