import React from "react";

function Nav({ connectWallet, disconnectWallet, ethAddress }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        marginLeft: "40vw",
        backgroundColor: "red",
      }}
    >
      {/* <h3>nav</h3> */}
      <button onClick={() => connectWallet()}>{ethAddress}</button>
      <button onClick={() => disconnectWallet()}>disconnect</button>
    </div>
  );
}

export default Nav;
