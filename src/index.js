import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { loadWeb3 } from './utils/web3';
import { Web3Provider } from './context/Web3Context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home'
import Wallet from './pages/Wallet';

loadWeb3().then(
  render
)
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Web3Provider>
        <Router>

          <Route path="/wallet" exact component={Wallet} />
          <Route path="/" exact component={Home} />
        </Router>
      </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

