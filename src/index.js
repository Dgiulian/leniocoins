import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { loadWeb3 } from './utils/web3';
import { Web3Provider } from './context/Web3Context';

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

