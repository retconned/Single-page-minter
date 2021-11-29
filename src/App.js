import "./App.css";
import Web3 from "web3";
import Nav from "./components/Nav";
import MintingContract from "./MintingContract.json";
import { useEffect, useState } from "react";

function App() {
  const CONTRACT_ADDRESS = "0x77C9e7733550026AcE28950e973681C0F74191E3";
  const [contract, setContract] = useState(undefined);
  const [ethAddress, setEthAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const totalNfts = 8888;
  // let selectedAccount;
  // let nftContract;

  const connectWallet = async () => {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
      // MetaMask is installed

      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // selectedAccount = accounts[0];
          // console.log(`Selected account is ${selectedAccount}`);
          setEthAddress(accounts[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const disconnectWallet = () => {
    let provider = window.ethereum;

    if (typeof provider === "undefined") {
      // MetaMask is installed
      setEthAddress("");
      // provider.request({ method: "eth_requestAccounts" });
      console.log("disconeccted");
    }
  };

  const loadBlockchain = async () => {
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    // const network = await web3.eth.getChainId();
    // console.log("chainID: " + network);

    const contract = new web3.eth.Contract(
      MintingContract.abi,
      CONTRACT_ADDRESS
    );
    setContract(contract);
  };

  useEffect(() => {
    connectWallet();
    getSupply();
  });

  useEffect(() => {
    loadBlockchain();
  }, [window.ethereum]);

  const buyFlys = (number) => {
    if (contract !== undefined && ethAddress !== "") {
      // console.log(number);
      var value = number * 20000000;
      // console.log(value);
      // console.log(ethAddress);

      contract.methods
        .buyFlys(number)
        .send({ from: ethAddress, value: value })
        .then((tx) => {
          // console.log(tx);
          alert(
            "Transcation hash: " +
              "https://ropsten.etherscan.io/tx/" +
              tx.transactionHash
          );
          getSupply();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getSupply = () => {
    if (contract !== undefined && ethAddress !== "") {
      contract.methods
        .currentSupply()
        .call()
        .then((supply) => {
          setTotalSupply(supply);
          // console.log(supply);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Nav
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        ethAddress={ethAddress}
        // style={{ backgroundColor: "red" }}
      />
      <button onClick={() => buyFlys(5)}>Mint</button>
      <button onClick={() => getSupply()}>refreshSupply</button>
      <h4>{`${totalSupply} / ${totalNfts}`}</h4>
    </div>
  );
}

export default App;
