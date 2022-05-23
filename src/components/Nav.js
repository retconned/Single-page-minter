import React from "react";
import {
  Button,
  IconButton,
  HStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Nav({ connectWallet, disconnectWallet, ethAddress }) {
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack alignItems="center" justifyContent="flex-end" p="4">
      {ethAddress !== "" ? (
        <Button
          onClick={() => {
            navigator.clipboard.writeText(ethAddress).then(
              toast({
                description: "Address copied.",
                status: "success",
                duration: 1000,
              })
            );
          }}
        >
          {ethAddress.slice(0, 6)}...
          {ethAddress.slice(ethAddress.length - 4, ethAddress.length)}
        </Button>
      ) : (
        ""
      )}
      {ethAddress !== "" ? (
        <Button onClick={() => disconnectWallet()}>disconnect</Button>
      ) : (
        <Button onClick={() => connectWallet()}>connect</Button>
      )}
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        isRound="true"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
    </HStack>
  );
}

export default Nav;
