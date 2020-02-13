import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ConciseCharityCoin from "./contracts/ConciseCharityCoin.json";

const App = () => {
  const [web3, setWeb3] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getWeb3 = async () => {
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
    };
    getWeb3();    
  }, []);

  useEffect(() => {
    const getBalanceFor = async account => {
      if (web3.contract) {
        const balanceOfAccount = await web3.contract.methods.balanceOf(account).call();
        setBalance(balanceOfAccount);
      }
    };
    getBalanceFor(web3.account);
  }, [web3.account]);

  return (<div>
    <h3>Account: {web3.account}</h3>
    <h1>Balance: {balance} </h1>
  </div>)
};


/* class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {


    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(6).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
} */

export default App;
