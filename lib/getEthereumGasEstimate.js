import { ethers } from 'ethers';

const getEthereumGasEstimate = async (provider, abi, bytecode, deployArguments) => {
  if (!provider) return;

  const signer = provider.getSigner()
  const network = await provider.getNetwork()
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const transaction = await factory.getDeployTransaction(...deployArguments)
  const gasEstimate = await provider.estimateGas(transaction)
  const gasPrice = await provider.getGasPrice()
  
  return {
    network: network.chainId,
    gas: ethers.BigNumber.from(gasEstimate).toNumber(),
    price: ethers.utils.formatUnits(gasPrice, "gwei"),
    cost: ethers.utils.formatEther(
      ethers.BigNumber.from(gasEstimate).mul(ethers.BigNumber.from(gasPrice))
    )
  }
}

export default getEthereumGasEstimate;