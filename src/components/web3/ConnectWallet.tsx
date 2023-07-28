'use client';
import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { injected } from "@/utils/connectors";

const ActivateButton = () => {
  const { active, activate } = useWeb3React()

  const handleActivate = async () => {
    try {
      await activate(injected, undefined, true)
    } catch (error) {
      console.error(error)
    }
    
  }

  return !active ? (
    <Button disabled={active} onClick={handleActivate}>Connect</Button>
  ) : <></>
}

const DeactivateButton = () => {
  const { active, deactivate, account } = useWeb3React()
  
  const handleDeactivate = async () => {
    deactivate()
  }

  return account ? (
    <Button disabled={!active} onClick={handleDeactivate}>Disconnect : {`${account?.slice(0,4)}...${account?.slice(-4)}`}</Button>
  ) : <></>
}

const ConnectWallet = () => {

  return (
    <Box display='flex'>
      <ActivateButton />
      <DeactivateButton />
    </Box>
  )
}

export default ConnectWallet;