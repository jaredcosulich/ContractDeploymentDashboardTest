import {
  TWButton
} from '.'
import { ethereumNetworkIdToName } from '../lib'

import { ethers } from 'ethers';

const DeploySolidityContractButton = ({ provider, abi, bytecode, deployArguments }) => {

  const deployContract = async () => {
    const { chainId } = await provider.getNetwork()
    const networkName = ethereumNetworkIdToName(chainId)

    const confirmationMessage = `Are you sure you want to deploy this contract on the ${networkName} network?`
    if (!confirm(confirmationMessage)) return;

    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(abi, bytecode, signer);

    try {
      const contract = await factory.deploy(...deployArguments);
      const receipt = await contract.deployTransaction.wait();
      console.log("RECEIPT", receipt)
    } catch (e) {
      console.error("Error deploying contract", e)
    }
  }

  return (
    <div>
      <TWButton
        onClick={deployContract}
      >
      Deploy Contract
      </TWButton>
      <div className='text-xs'>
        You will be prompted to confirm the
        <br/> 
        transaction before anything happens.
      </div>
    </div>
  )

}

export default DeploySolidityContractButton;