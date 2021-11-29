import "./App.css";
import Web3 from "web3";
import Nav from "./components/Nav";
import MintingContract from "./MintingContract.json";
import { useEffect, useState } from "react";

function App() {
  const CONTRACT_ADDRESS = "0x77C9e7733550026AcE28950e973681C0F74191E3";
  const [contract, setContract] = useState(undefined);
  const [ethAddress, setEthAddress] = useState("");
  // const [totalSupply, setTotalSupply] = useState(0);
  let selectedAccount;
  // let nftContract;
  async function connectWallet() {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
      // MetaMask is installed

      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          console.log(`Selected account is ${selectedAccount}`);
          setEthAddress(accounts[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // web3.
  }

  async function loadBlockchain() {
    let provider = window.ethereum;
    const web3 = new Web3(provider);

    const nftContract = new web3.eth.Contract(
      MintingContract.abi,
      CONTRACT_ADDRESS
    );
    setContract(nftContract);
    // const totalSupply = await contract.methods.currentSupply().call();
    console.log(nftContract);
  }
  useEffect(() => {
    loadBlockchain();
  }, [window.ethereum]);
  const buyFlys = (number) => {
    if (contract !== undefined && ethAddress !== "") {
      console.log(number);
      var value = number * 20000000;
      console.log(value);
      console.log(selectedAccount);
      contract.methods.buyFlys(number).send({ from: ethAddress, value: value });
    }
  };

  return (
    <div>
      <Nav connectWallet={connectWallet} />
      <button onClick={() => buyFlys(5)}>Mint</button>
    </div>
  );
}

export default App;
