import abi from "./contract/DemoApp.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import GetBalance from "./components/GetBalance";
import Transfer from "./components/Transfer";

function App() {
  const [walletState, setWalletState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          // Handle if Ethereum provider is not available
          console.error("Please install MetaMask or another Ethereum-compatible browser extension.");
          return;
        }

        const [account] = await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x9D9dB10e722ea3A6ba8Ab7cDE15E183C02D0011C";
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);

        setWalletState({ provider, signer, contract });
      } catch (error) {
        // Handle errors gracefully
        console.error("Error connecting to wallet:", error);
      }
    };

    connectWallet();
  }, []);

  console.log(walletState);

  return (
    <div className="App">
      <Buy state={walletState} />
      <Memos state={walletState} />
      <GetBalance state={walletState} />
      <Transfer state={walletState} />
    </div>
  );
}


export default App;
