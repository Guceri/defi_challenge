require('dotenv').config()
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.MNEMONIC;

//web3(rinkeby)
const web3 = new Web3(new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`) )

//abi of our smart contract
const Swap = require('./build/contracts/Swap.json')
//Ropsten Address of our smart contract
const Swap_Address = '0x2987b661c0ef441F6410f141778677c0d662d04c'
//contract
const swap = new web3.eth.Contract(Swap.abi, Swap_Address)
//variables
const token_trade_amount = web3.utils.toWei('.01', 'ether')
const Link_Address = '0x20fe562d797a42dcb3399062ae9546cd06f63280'
const WETH_Address = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
const account = process.env.ACCOUNT
const gasPrice = '50'//Gwei
const gasLimit = 8000000

async function callContract(){
  const settings = {
    gasLimit: gasLimit,
    gasPrice: web3.utils.toWei(gasPrice, 'Gwei'),
    from: account
  }
  const trade = await swap.methods.swapTrade(Link_Address, WETH_Address, token_trade_amount).send(settings).on('transactionHash', (hash => {
    console.log('Transaction Hash: ' + hash)
  }))
}

callContract()