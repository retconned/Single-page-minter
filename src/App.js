import "./App.css";
import Web3 from "web3";
import Nav from "./components/Nav";
import MintingContract from "./MintingContract.json";
import { useEffect, useState } from "react";
import {
  Center,
  Image,
  Button,
  HStack,
  VStack,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function App() {
  let ethWindow = window.ethereum;
  const CONTRACT_ADDRESS = "0x77C9e7733550026AcE28950e973681C0F74191E3";
  const [contract, setContract] = useState(undefined);
  const [ethAddress, setEthAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const [latestTx, setlatestTx] = useState("");
  const [nftUrl, setNftUrl] = useState("");
  const [osLink, setOsLink] = useState("");
  const totalNfts = 8888;
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const contractShowcase = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

  const connectWallet = async () => {
    let provider = window.ethereum;

    if (typeof provider !== "undefined") {
      // MetaMask is installed

      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setEthAddress(accounts[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const disconnectWallet = () => {
    setEthAddress("");
    alert("disconnected");
    // console.log("disconeccted");
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
    getSupply();
  });

  useEffect(() => {
    nftShowcase();
    connectWallet();
    loadBlockchain();
  }, [ethWindow]);

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
          console.log(tx);
          setlatestTx(tx.transactionHash);
          setOsLink(
            "https://opensea.io/assets/" +
              tx.to +
              "/" +
              tx.events.Transfer.returnValues.tokenId
          );
          console.log(osLink);
          onOpen();
          getSupply();
          // between(1, 998);
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
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
    console.log(mintAmount); // logs mint amount
  };

  const incrementMintAmount = () => {
    const maxMintAmount = 20;
    // ^^^^^^^ max mint per transaction/mint amount
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > maxMintAmount) {
      newMintAmount = maxMintAmount;
    }
    setMintAmount(newMintAmount);
    console.log(mintAmount); // logs mint amount
  };

  // const tokenID = 998;

  function nftShowcase() {
    // console.log(" fetched art ");
    // Enable for pictures
    // between(1, 998);
    // setTimeout(nftShowcase, 5000);
  }

  function between(min, max) {
    const tokenGen = Math.floor(Math.random() * (max - min + 1) + min);
    let tokenID = "";

    if (tokenGen <= 10) {
      tokenID = tokenGen <= 10 ? tokenGen : "00" + tokenGen;
    } else {
      tokenID = tokenGen >= 100 ? tokenGen : "0" + tokenGen;
    }

    // console.log(tokenGen);
    console.log(tokenID);
    // if
    setNftUrl("https://media.artblocks.io/78000" + tokenID + ".png");
    // setNftUrl("https://media.artblocks.io/78000" + tokenGen + ".png");

    return;
  }

  useEffect(() => {
    // nftShowcase();
    // between(1, 998);
  });

  // Example:
  // const randomNumberID = between(1, 998);
  // console.log(randomNumberID);

  return (
    <div>
      <Nav
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        ethAddress={ethAddress}
        // style={{ backgroundColor: "red" }}
      />
      <Center>
        <Image
          pt="50px"
          align="center"
          boxSize="25%"
          src={nftUrl}
          alt="Placeholder image"
          fallbackSrc="https://via.placeholder.com/2000x2400"
        />
      </Center>
      <>
        <Modal
          motionPreset="slideInBottom"
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          // isCentered="true"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader align="center">Mint succsessfull</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Image
                src={nftUrl}
                boxSize="50%"
                align="center"
                fallbackSrc="https://via.placeholder.com/2000x2400"
                pb="6"
                pt="6"
              />
              <Link
                href={"https://ropsten.etherscan.io/tx/" + latestTx}
                isExternal
                offset="2"
                alignSelf="center"
                pt="3"
              >
                View on etherscan <ExternalLinkIcon mx="2px" />
              </Link>

              <Link
                href={osLink}
                isExternal
                offset="2"
                alignSelf="center"
                pt="6"
              >
                View on OpenSea <ExternalLinkIcon mx="2px" />
              </Link>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose} size="sm">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <HStack justifyContent="center" mt="02%">
        <Button size="sm" onClick={() => incrementMintAmount()}>
          +
        </Button>
        <Button _hover={{}} _active={{}} _focus={{}}>
          {mintAmount}
        </Button>
        <Button size="sm" onClick={() => decrementMintAmount()}>
          -
        </Button>
      </HStack>
      <VStack justifyContent="center" mt="02%">
        {/* <Button onClick={() => getSupply()}>refreshSupply</Button> */}
        <Button onClick={() => buyFlys(mintAmount)}>Mint</Button>
        {/* <Button onClick={() => between(1, 998)}>Fetch</Button> */}
        <HStack>
          <Button onClick={() => onOpen()}>Modal open</Button>
        </HStack>

        <Heading
          size="sm"
          mt="8"
          pt="10"
        >{`${totalSupply} / ${totalNfts}`}</Heading>
      </VStack>
    </div>
  );
}

export default App;
