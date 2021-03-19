const LenioCoin = artifacts.require('./Leniocoin.sol');
const CoinSale = artifacts.require('./CoinSale.sol');

module.exports = async function (deployer) {
    await deployer.deploy(LenioCoin, 1000000);
    await deployer.deploy(CoinSale, LenioCoin.address, web3.utils.toWei('0.001', 'Ether'));
}