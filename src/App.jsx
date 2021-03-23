import React, { useContext, useEffect, useState } from 'react';
import BgParticles from './components/BgParticles';
import Navbar from './components/Navbar';
import { Web3Context } from './context/Web3Context';
import { web3 } from './utils/web3';

function App() {
  // Instantiate web3
  // Connect to wallet and display account
  // Instantiate SaleContract (TruffleContract? Drizzle?)
  // Instantiate TokenContract (TruffleContract? Drizzle?)
  // Display loading state while connecting to wallet    
  const [tokensSold, setTokensSold] = useState('');
  const [tokenPrice, setTokenPrice] = useState(0)
  const { coinSale } = useContext(Web3Context);
  useEffect(() => {
    if (coinSale) {
      coinSale.getTokenPrice().then(tokenPrice => setTokenPrice(tokenPrice));
      coinSale.getTokensSold().then(num => setTokensSold(num));
    }
  }, [coinSale]);
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div className="min-h-screen">

      <Navbar />
      <BgParticles />
      <div className="relative z-10 bg-black bg-opacity-50 px-4 py-32 flex flex-col justify-center items-center">
        <div class="text-gray-200">
          <h1 className="text-2xl mb-2"> Buy Lenio coins</h1>
          <form action="" method="POST" onSubmit={handleSubmit}>

            <input type="number"
              className="rounded border-0 text-black"
              pattern="[0-9]" min="1" />
            <button className="bg-blue-600 px-4 py-2 rounded ml-1 ">Buy tokens</button>
          </form>
          <div className="mt-1 ">
            {tokenPrice && (<p>Price {web3.utils.fromWei(tokenPrice + '', 'Ether')} ETH</p>)}
            {tokensSold && <p>{tokensSold} Tokens sold</p>}
          </div>
        </div>
      </div>
      {/*
      <div>
      progress soldTokens / totalSupply
      </div>
    */}
    </div>
  )
}

export default App


