import React, { useContext, useEffect, useState } from 'react'
import { Web3Context } from '../context/Web3Context'
import CoinLogo from '../shared/shiny-coin.svg';
import WalletIcon from '../shared/wallet.svg';

import { getAccounts } from '../utils/web3';
import { Link } from 'react-router-dom';
function Navbar() {
    const { account, setAccount } = useContext(Web3Context);
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        getAccounts().then(setAccounts)
    })
    return (
        <div className="bg-gray-300 relative z-10 ">
            <header className="container py-4 mx-auto">
                <nav className="flex justify-between align-middle" >
                    <div className="text-xl flex items-center">
                        <img src={CoinLogo} alt="Lenio Logo" className="w-6 mr-2" />
                        <Link to="/" >Lenio Coins</Link>
                    </div>
                    <Link to="/wallet" className="text-gray-600 ml-auto flex items-center mr-2">
                        <img src={WalletIcon} alt="Lenio Logo" className="w-6 mr-2" />
                            Wallet
                    </Link>
                    <div>
                        <select name="account" id="account" value={account} onChange={(e) => setAccount(e.target.value)}>
                            {accounts.map(acc => (<option value={acc} key={acc} >{acc}</option>))}
                        </select>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
