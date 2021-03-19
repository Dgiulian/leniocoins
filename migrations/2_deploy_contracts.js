const LenioCoin = artifacts.require('./Leniocoin.sol');

module.exports = function (deployer) {
    deployer.deploy(LenioCoin, 150000);
}