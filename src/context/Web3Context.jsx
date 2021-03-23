import { createContext, useState, useEffect } from 'react';
import { LenioCoinContract, getAccount, getNetworkId, CoinSaleContract } from '../utils/web3';
const Web3Context = createContext(null);

const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [lenioCoin, setLenioCoin] = useState(null);
    const [coinSale, setCoinSale] = useState(null);



    useEffect(() => {
        async function loadData() {
            const account = await getAccount();
            const networkId = await getNetworkId();

            setAccount(account);
            setNetworkId(networkId);
            setLenioCoin(new LenioCoinContract(networkId));
            setCoinSale(new CoinSaleContract(networkId));
        }
        loadData();
    }, [])
    return (
        <Web3Context.Provider value={{ account, networkId, coinSale, lenioCoin }}>
            {children}
        </Web3Context.Provider>
    )
}
export {
    Web3Provider,
    Web3Context
}