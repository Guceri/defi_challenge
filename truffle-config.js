require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 3,       
      gas: 8000000,        
      confirmations: 0,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: 'istanbul' //berlin is experimental
    }
  }
}
