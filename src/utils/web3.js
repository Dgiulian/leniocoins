import Web3 from 'web3';
import CoinSale from '../abis/CoinSale.json'
import LenioCoin from '../abis/LenioCoin.json'
export let web3;
export async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        //web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        alert('Non Ethereum browser detected. You shoudl consider trying Metamask!');
        return;
    }
    window.web3 = web3;
}
export async function getAccount(idx = 0) {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > idx) {
        return accounts[idx]
    }
}
export async function getAccounts() {
    return web3.eth.getAccounts();
}

export async function getNetworkId() {
    return window.web3.eth.net.getId();
}

export class LenioCoinContract {
    constructor(networkId) {
        const lenioCoinData = LenioCoin.networks[networkId];
        if (lenioCoinData) {
            this.lenioCoin = new window.web3.eth.Contract(LenioCoin.abi, lenioCoinData.address);
        } else {
            console.error(`LenioCoin contract not deployed to the network`);
        }
    }
    balanceOf(address) {
        return this.lenioCoin.methods.balanceOf(address).call();
    }
    getTotalSupply() {
        return this.lenioCoin.methods.totalSupply().call();
    }
    transfer() {

    }
}
export class CoinSaleContract {

    constructor(networkId) {
        const contractData = CoinSale.networks[networkId];
        if (contractData) {
            this.coinSale = new window.web3.eth.Contract(CoinSale.abi, contractData.address);
        } else {
            console.error(`CoinSale contract not deployed to the network`);
        }
    }
    async getTokenPrice() {
        if (this.coinSale) {
            return this.coinSale.methods.tokenPrice().call();
        }
    }

    async getTokensSold() {
        if (this.coinSale) {
            return this.coinSale.methods.tokensSold().call();
        }
    }
    buyTokens(numTokens, tokenPrice, account) {
        //const tokenPrice = await this.getTokenPrice();
        const value = numTokens * tokenPrice;
        console.log(account, value, numTokens, tokenPrice);
        return new Promise((resolve, reject) => {
            this.coinSale.methods.buyTokens(numTokens).send({ from: account, value }).on('receipt', resolve).on('error', reject);
        });
    }
}