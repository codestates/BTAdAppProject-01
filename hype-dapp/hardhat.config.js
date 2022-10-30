/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
const API_KEY = process.env.REACT_APP_PINATA_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:`${API_KEY}`,
      accounts:[`${PRIVATE_KEY}`]
    }
  },
  paths:{
    artifacts:'./src/artifacts'
  }
};
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// const fs = require('fs');
// // const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
// require('dotenv').config();

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// module.exports = {
//   defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {
//       chainId: 1337
//     },
//     goerli: {
//       url: process.env.REACT_APP_ALCHEMY_API_URL,
//       accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
//     }
//   },
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   }
// };