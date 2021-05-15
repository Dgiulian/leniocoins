import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BgParticles from '../components/BgParticles';
import { Web3Context } from '../context/Web3Context';
import { web3 } from '../utils/web3';

function Home() {
  // Instantiate web3
  // Connect to wallet and display account
  // Instantiate SaleContract (TruffleContract? Drizzle?)
  // Instantiate TokenContract (TruffleContract? Drizzle?)
  // Display loading state while connecting to wallet
  const [numTokens, setNumTokens] = useState(1);
  const [tokensSold, setTokensSold] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const { coinSale, lenioCoin, account } = useContext(Web3Context);
  useEffect(() => {
    if (coinSale) {
      coinSale.getTokenPrice().then(tokenPrice => setTokenPrice(tokenPrice));
      coinSale.getTokensSold().then(num => setTokensSold(num));
    }
    if (lenioCoin) {
      lenioCoin.getTotalSupply().then(total => setTotalSupply(total))
    }
  }, [coinSale]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tokenPrice) {
      return;
    }
    coinSale.buyTokens(numTokens, tokenPrice, account).then(async (receipt) => {

      const tokensSold = await coinSale.getTokensSold();
      console.log(receipt, tokensSold)
      setTokensSold(tokensSold);
      setNumTokens('');
    });
  }
  return (
    <Layout>

      <BgParticles />

      <div className="relative z-10  px-4 mt-64 flex flex-col justify-center items-center">
        <div className="text-gray-200 border p-16 rounded-xl bg-black bg-opacity-30">
          <h1 className="text-2xl mb-2"> Buy Lenio coins</h1>
          <form action="" method="POST" onSubmit={handleSubmit}>

            <input type="number"
              className="rounded border-0 text-black"
              pattern="[0-9]" min="1"
              onChange={(e) => setNumTokens(e.target.value)} />
            <button className="bg-blue-600 px-4 py-2 rounded ml-1 ">Buy coins</button>
          </form>
          <div className="mt-1 ">
            {tokenPrice && (<p>Price {web3.utils.fromWei(tokenPrice + '', 'Ether')} ETH</p>)}
            {tokensSold && totalSupply && (<p>{tokensSold} / {totalSupply}  coins sold</p>)}
          </div>
        </div>
      </div>
      {/*
      <div>
      progress soldTokens / totalSupply
      </div>
    */}
    </Layout>
  )
}

export default Home


