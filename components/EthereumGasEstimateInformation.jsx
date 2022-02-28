import {
  getEthereumGasEstimate
} from '../lib'

import {
  BoldKeyAndValue
} from '.'

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const EthereumGasEstimateInformation = ({ provider, contract, deploymentArguments }) => {
  const [deploymentInfo, setDeploymentInfo] = useState();

  useEffect(() => {
    if (deploymentInfo && !deploymentArguments) {
      setDeploymentInfo(null)
    }

    if (!deploymentArguments) {
      return;
    }

    const getGasEstimate = async () => {
      const _deploymentInfo = await getEthereumGasEstimate(
        provider,
        contract.info.abi,
        contract.info.bytecode,
        deploymentArguments
      );
      setDeploymentInfo(_deploymentInfo);
    }

    getGasEstimate()
  }, [deploymentInfo, provider, contract, deploymentArguments])
  
  if (!deploymentInfo) {
    return (
      <div className='text-xs py-6'>
        Provide deployment arguments to get
        <br/>
        an estimate on gas or deploy the contract.
      </div>
    )
  }

  return (
    <div>
      <BoldKeyAndValue
        title="Network"
        value={deploymentInfo.network}
      />
      <BoldKeyAndValue
        title="Gas"
        value={ethers.utils.commify(deploymentInfo.gas)}
      />
      <BoldKeyAndValue
        title="Gas Price"
        value={`${Math.round(deploymentInfo.price * 100) / 100} GWEI`}
      />
      <BoldKeyAndValue
        title="Transaction Cost"
        value={`${Math.round(deploymentInfo.cost * 10000) / 10000} ETH`}
      />      
    </div>
  )

}

export default EthereumGasEstimateInformation;