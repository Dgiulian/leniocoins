import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Web3 from 'web3';
import CoinSale from './abis/CoinSale.json'
import LenioCoin from './abis/LenioCoin.json'
import { Web3Provider } from './context/Web3Context';

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    alert('Non Ethereum browser detected. You shoudl consider trying Metamask!')
  }
}

loadWeb3().then(
  render
)
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Web3Provider>
        <App />
      </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

