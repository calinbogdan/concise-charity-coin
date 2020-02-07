const ConciseCharityCoin = artifacts.require("./ConciseCharityCoin.sol");

module.exports = function(_deployer) {
  _deployer.deploy(ConciseCharityCoin);
};
