import React, { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'
import CoinLogo from '../shared/shiny-coin.svg';

function Navbar() {
    const { account } = useContext(Web3Context);
    return (
        <div className="bg-gray-300 relative z-10 ">
            <header className="container py-4 mx-auto flex justify-between align-middle">
                <span className="text-xl flex" >
                    <img src={CoinLogo} alt="Lenio Logo" className="w-6 mr-2" />  Lenio Coins</span>
                <span className="text-gray-600">{account}</span>
            </header>
        </div>
    )
}

export default Navbar
