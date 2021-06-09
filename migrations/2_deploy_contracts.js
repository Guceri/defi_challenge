const Swap = artifacts.require("Swap");

module.exports = function(deployer) {
  deployer.deploy(Swap, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506');
};
