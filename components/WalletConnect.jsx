import useWalletConnector from "../hooks/useWalletConnector";
import useWeb3SubscribeProvider from "../hooks/web3SubscribeProvider";
import { Button } from "@mui/material";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useSigner } from "wagmi";

export default function WalletConnect() {
  const { resetAll, } = useWeb3SubscribeProvider();

  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect Wallet";
  const account = useAccount();
  const { address, } = account;
  const { onConnect, } = useWalletConnector();
  const { data: signer } = useSigner();


  useEffect(() => {
    if (isConnected && signer) {
      onConnect();
    }
  }, [address, isConnected, onConnect, signer]);

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
      resetAll();
    } else {
      onOpen();
    }
  }

  return (
    <div variant="contained" onClick={onClick} disabled={loading}
    style={{
      background: 'rgb(246, 210, 60)',
      width:'100%',
      fontSize: 14,
      fontWeight:'bold',
      border:'none',
      outline:'none',
      padding: '8px 16px',  
      borderRadius:'12px',
      cursor: 'pointer',
      fontFamily:'Montserrat'
    }}
    >
      {loading ? "Loading..." : label}
    </div>
  );
}