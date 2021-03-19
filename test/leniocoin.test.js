const { expect, assert } = require('chai');

const LenioCoin = artifacts.require('./LenioCoin.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('LenioCoin', (accounts) => {
    let lenio;
    before(async () => {
        lenio = await LenioCoin.deployed();
    })
    describe('Deployment', async () => {
        it('Sets the total supply at deployment', async () => {
            const totalSupply = await lenio.totalSupply();
            assert.equal(totalSupply.toNumber(), 150000, 'The initial supply is not correct');
            const balance = await lenio.balanceOf(accounts[0]);
            assert.equal(balance.toNumber(), 150000, 'The initial balance is not allocated to the admin');
        });
        it('Has the correct name and symbol', async () => {
            const name = await lenio.name();
            assert.equal(name, 'Lenio Coin', 'The name of the coin is not correct');
            const symbol = await lenio.symbol();
            assert.equal(symbol, 'LENI', 'The symbol is not correct');
        });
    });
    describe('Transfer', async () => {
        it('should throw if the sender does not have enough funds', async () => {
            await lenio.transfer(accounts[1], 10000000, { from: accounts[0] }).should.be.rejected;
        })

        it('The result balance after transfer is correct', async () => {
            const transferAmount = 100;
            const sender = accounts[0];
            const receiver = accounts[1];
            const initialBalance = await lenio.balanceOf(receiver)
            const adminBalance = await lenio.balanceOf(sender)
            const receipt = await lenio.transfer(receiver, transferAmount, { from: sender });
            const resultAdminBalance = await lenio.balanceOf(sender)
            const resultBalance = await lenio.balanceOf(receiver);
            assert.equal(initialBalance.toNumber() + transferAmount, resultBalance.toNumber(), 'The balance is added to the receiver');
            assert.equal(adminBalance.toNumber() - transferAmount, resultAdminBalance.toNumber(), 'The amount is not substracted from the sender');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Transfer event was not emited');
            assert.equal(receipt.logs[0].args._from, sender, 'Transfer event does not include sender');
            assert.equal(receipt.logs[0].args._to, receiver, 'Transfer event does not include receiver');
            assert.equal(receipt.logs[0].args._value, transferAmount, 'Transfer event does not include the correct amount');

        })
    });
    describe('Approve', async () => {
        it('approves tokens for delegated transfer', async () => {
            /* Use the .call method to avoid making a transaction and modifing the blockchain */
            const response = await lenio.approve.call(accounts[1], 100, { from: accounts[0] });
            assert.equal(response, true, 'Approve does not return successfully');
        });
        it('Sends the appropiate event after an aproval', async () => {
            const value = 100;
            const sender = accounts[0];
            const receiver = accounts[1];
            const receipt = await lenio.approve(receiver, value, { from: sender });
            assert.equal(receipt.logs[0].event, 'Approval', 'Approve event was not emited');
            assert.equal(receipt.logs[0].args._owner, sender, 'Approve event does not include owner');
            assert.equal(receipt.logs[0].args._spender, receiver, 'Approve event does not include spender');
            assert.equal(receipt.logs[0].args._value, value, 'Approve event does not include the correct value');
            const allowance = await lenio.allowance(sender, receiver);
            assert.equal(allowance.toNumber(), value, 'The allowed value does not match');
        });


    })
    describe('TranferFrom', async () => {
        let value;
        let fromAccount;
        let toAccount;
        let spendingAccount;

        before(async () => {
            value = 100;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
        });
        it('should make the transfer and have the appropiate balance', async () => {
            await lenio.transfer(fromAccount, value * 2);
            await lenio.approve(spendingAccount, value, { from: fromAccount });
            const balanceFrom = (await lenio.balanceOf(fromAccount)).toNumber();
            const balanceTo = (await lenio.balanceOf(toAccount)).toNumber();
            const receipt = await lenio.transferFrom(fromAccount, toAccount, value, { from: spendingAccount });

            assert.equal(receipt.logs[0].event, 'Transfer', 'Transfer event was not emited');
            assert.equal(receipt.logs[0].args._from, fromAccount, 'Transfer event does not include sender');
            assert.equal(receipt.logs[0].args._to, toAccount, 'Transfer event does not include receiver');
            assert.equal(receipt.logs[0].args._value, value, 'Transfer event does not include the correct amount');

            // Check the allowance of the spender is set to 0
            const allowance = await lenio.allowance(fromAccount, spendingAccount);
            assert.equal(allowance.toNumber(), 0, 'The allowed value must be 0');

            // Check balance of fromAccount
            const balanceFromAfter = await lenio.balanceOf(fromAccount);
            assert.equal(balanceFromAfter.toNumber(), balanceFrom - value, 'The balance from was nos substracted');

            // Check balance of toAccount
            const balanceToAfter = await lenio.balanceOf(toAccount);
            assert.equal(balanceToAfter.toNumber(), balanceTo + value, 'The balance of the receiver was not added');

        });
        it('should prevent the transfer if the amount is larger than the allowed', async () => {
            await lenio.transfer(fromAccount, 20);
            await lenio.approve(spendingAccount, 20, { from: fromAccount });
            const balanceFrom = (await lenio.balanceOf(fromAccount)).toNumber();
            const balanceTo = (await lenio.balanceOf(toAccount)).toNumber();

            const receipt = await lenio.transferFrom(fromAccount, toAccount, value, { from: spendingAccount }).should.be.rejected;

            // Check the allowance of the spender is set to 0
            const allowance = await lenio.allowance(fromAccount, spendingAccount);
            assert.equal(allowance.toNumber(), 20, 'The allowed should not be affected');

            // Check balance of fromAccount
            const balanceFromAfter = await lenio.balanceOf(fromAccount);
            assert.equal(balanceFromAfter.toNumber(), balanceFrom, 'The balance from should not be affected');

            // Check balance of toAccount
            const balanceToAfter = await lenio.balanceOf(toAccount);
            assert.equal(balanceToAfter.toNumber(), balanceTo, 'The balance of the receiver should not be affected');

        });
        it('should prevent the transfer if the amount is larger than the balance', async () => {

            const balanceFrom = (await lenio.balanceOf(fromAccount)).toNumber();
            await lenio.approve(spendingAccount, balanceFrom, { from: fromAccount });
            const balanceTo = (await lenio.balanceOf(toAccount)).toNumber();

            const receipt = await lenio.transferFrom(fromAccount, toAccount, balanceFrom + 1, { from: spendingAccount }).should.be.rejected;

            // Check the allowance of the spender is set to 0
            const allowance = await lenio.allowance(fromAccount, spendingAccount);
            assert.equal(allowance.toNumber(), balanceFrom, 'The allowed should not be affected');

            // Check balance of fromAccount
            const balanceFromAfter = await lenio.balanceOf(fromAccount);
            assert.equal(balanceFromAfter.toNumber(), balanceFrom, 'The balance from should not be affected');

            // Check balance of toAccount
            const balanceToAfter = await lenio.balanceOf(toAccount);
            assert.equal(balanceToAfter.toNumber(), balanceTo, 'The balance of the receiver should not be affected');

        });
    })
})