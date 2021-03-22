import React, { useContext } from 'react'
import Navbar from './components/Navbar';
import { Web3Context } from './context/Web3Context'

function App() {
  // Instantiate web3
  // Connect to wallet and display account
  // Instantiate SaleContract (TruffleContract? Drizzle?)
  // Instantiate TokenContract (TruffleContract? Drizzle?)
  // Display loading state while connecting to wallet  

  return (
    <div className="min-h-screen">

      <Navbar />

      <div className="container mx-auto mt-32">
        <h1 className="text-xl mb-2"> Buy Lenio coins</h1>
        <input type="number"
          className="rounded border"
          pattern="[0-9]" min="1" />
        <button className="bg-green-500 px-4 py-2 rounded ml-1 border">Buy tokens</button>
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


