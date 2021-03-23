import React, { useContext, useEffect, useState } from 'react'
import { Web3Context } from '../context/Web3Context'
import CoinLogo from '../shared/shiny-coin.svg';
import { getAccounts } from '../utils/web3';

function Navbar() {
    const { account, setAccount } = useContext(Web3Context);
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        getAccounts().then(setAccounts)
    })
    return (
        <div className="bg-gray-300 relative z-10 ">
            <header className="container py-4 mx-auto flex justify-between align-middle">
                <span className="text-xl flex" >
                    <img src={CoinLogo} alt="Lenio Logo" className="w-6 mr-2" />  Lenio Coins</span>
                <span className="text-gray-600">
                    <select name="account" id="account" value={account} onChange={(e) => setAccount(e.target.value)}>
                        {accounts.map(acc => (<option value={acc} key={acc} >{acc}</option>))}
                    </select>
                </span>
            </header>
        </div>
    )
}

export default Navbar
