import React from "react";
// import Web3 from "web3";

function Nav({ connectWallet }) {
  return (
    <div>
      <h3>nav</h3>
      <button onClick={() => connectWallet()}>connect nav</button>
    </div>
  );
}

export default Nav;
