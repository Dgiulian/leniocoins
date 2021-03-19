const { assert } = require("chai");

const CoinSale = artifacts.require('./CoinSale.sol');
const LenioCoin = artifacts.require('./Leniocoin.sol');

contract('CoinSale', async (accounts) => {
    let tokenSaleInstance;
    let tokenInstance;
    const tokenPrice = await web3.utils.toWei('0.001', 'Ether');
    const numberOfTokens = 10;
    const admin = accounts[0];
    const buyer = accounts[1];
    const tokensAvailable = 750000;
    before(async () => {
        tokenSaleInstance = await CoinSale.deployed();
        tokenInstance = await LenioCoin.deployed();
    });
    describe('Deployment', async () => {
        it('Should have an address', async () => {
            assert.notEqual(tokenSaleInstance, 0x0, 'The contract has not been deployed');
        })
        it('Should have a token contract', async () => {
            assert.notEqual(tokenInstance, 0x0, 'The contract has not been deployed');
        });
        it('Should have a token price', async () => {
            assert.notEqual(await tokenSaleInstance.tokenPrice(), 0, `The token price should be ${tokenPrice}`);
        });
    })
    describe('Buy token', async () => {
        it('facilitates token buying', async () => {
            const value = numberOfTokens * tokenPrice;
            await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin });
            const receipt = await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value });
            // Check the balance
            const balance = await tokenInstance.balanceOf(tokenSaleInstance.address);
            // Check the event
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
            assert.equal(receipt.logs[0].event, 'Sell', 'Sell event was not emited');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'Sell event does not include sender');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'Sell event does not include amount');
            // Chech the number of tokens sold
            const tokensSold = await tokenSaleInstance.tokensSold();
            assert.equal(tokensSold.toNumber(), numberOfTokens, 'The number of sold tokens is not correct');

        });
    });
    describe('Sale end', async () => {
        it('should not allow to end the sale from other than admin ', async () => {
            await tokenSaleInstance.endSale({ from: accounts[1] }).should.be.rejected;
        });
        it('should return the unsold tokens to admin', async () => {
            await tokenSaleInstance.endSale({ from: admin });
            const balance = await tokenInstance.balanceOf(admin);
            assert.equal(balance.toNumber(), 999670, 'The unsold tokens were not returned to the admin');

        })
    })

});