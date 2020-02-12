import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import ConciseCharityCoin from "./contracts/ConciseCharityCoin.json";

const Web3Context = createContext({
    web3: null,
    account: null,
    contract: null
});

const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState({});

    useEffect(async () => {
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            web3 = window.web3;
        } else {
            throw new Error("Something clearly went wrong.");
        }

        const networkId = await web3.eth.net.getId();
        const network = ConciseCharityCoin.networks[networkId];

        const contract = new web3.eth.Contract(
            ConciseCharityCoin.abi, network?.address);

        setWeb3({ web3, contract, account: (await web3.eth.getAccounts())[0] });
    }, []);

    return (<Web3Context.Provider value={web3}>
            {children}
        </Web3Context.Provider>)
};

const Web3Consumer = Web3Context.Consumer;

export { Web3Provider, Web3Consumer };