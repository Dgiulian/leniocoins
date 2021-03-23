import Web3 from 'web3';
import CoinSale from '../abis/CoinSale.json'
import LenioCoin from '../abis/LenioCoin.json'
export let web3;
export async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
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
    async buyTokens(numTokens) {
        const tokenPrice = await this.getTokenPrice();
        const value = numTokens;
        // this.coinSale.buyTokens(numTokens).send({ from: this.address, value })
    }
}

/*
async function loadBlockchainData() {

    // Load DaiToken

    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
        const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
        this.setState({ daiToken });
        let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
        this.setState({ daiTokenBalance: daiTokenBalance.toString() });
    } else {
        window.alert(['DaiToken contract not deployed to detected network']);
    }
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
        const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
        this.setState({ dappToken });
        let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call();
        this.setState({ dappTokenBalance: dappTokenBalance.toString() });
    } else {
        window.alert(['DappToken contract not deployed to detected network']);
    }

    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
        const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
        this.setState({ tokenFarm });
        let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call();
        console.log(stakingBalance);
        this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
        window.alert(['TokenFarm contract not deployed to detected network']);
    }
    this.setState({ loading: false });

}
*/

