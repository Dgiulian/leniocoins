import React, { useContext, useEffect, useState } from 'react';
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

      <div className="container mx-auto mt-32">
        <h1 className="text-xl mb-2"> Buy Lenio coins</h1>
        <form action="" method="POST" onSubmit={handleSubmit}>

          <input type="number"
            className="rounded border"
            pattern="[0-9]" min="1" />
          <button className="bg-green-500 px-4 py-2 rounded ml-1 border">Buy tokens</button>
        </form>
        <div>
          {tokensSold && <p>{tokensSold}</p>}
          {tokenPrice && (<p>Price: {web3.utils.fromWei(tokenPrice + '', 'Ether')} ETH</p>)}
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


