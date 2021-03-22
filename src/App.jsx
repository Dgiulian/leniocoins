import React, { useContext } from 'react'

function App() {
  // Instantiate web3
  // Connect to wallet and display account
  // Instantiate SaleContract (TruffleContract? Drizzle?)
  // Instantiate TokenContract (TruffleContract? Drizzle?)
  // Display loading state while connecting to wallet
  return (
    <div className="bg-gray-300 ">
      <header className="container mx-auto">
        <h1 className="py-4">Lenio Coins</h1>
      </header>

      <div>
        <input type="number"
          placeholder="Insert the number of tokens"
          pattern="[0-9]" min="1" />
        |<button>Buy tokens</button>
      </div>

      <div>
        progress soldTokens / totalSupply
      </div>
    </div>
  )
}

export default App


