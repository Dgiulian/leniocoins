import React, { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'

function Navbar() {
    const { account } = useContext(Web3Context);
    return (
        <div className="bg-gray-300 ">
            <header className="container mx-auto">
                <h1 className="py-4">Lenio Coins</h1>
                {account}
            </header>
        </div>
    )
}

export default Navbar
