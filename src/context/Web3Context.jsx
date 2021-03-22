import { createContext, useState, useEffect } from 'react';
import web3 from 'web3'

const Web3Context = createContext(null);

const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        async function loadData() {
            const accounts = await window.web3.eth.getAccounts();
            if (accounts[0]) setAccount(accounts[0])

        }
        loadData();

    }, [])
    return (
        <Web3Context.Provider value={{ account }}>
            {children}
        </Web3Context.Provider>
    )


}
export {
    Web3Provider,
    Web3Context
}