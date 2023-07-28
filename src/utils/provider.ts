import { ethers } from "ethers"


export function getProvider(provider: any) {
  const web3Provider = new ethers.BrowserProvider(window.ethereum)
  return web3Provider
}