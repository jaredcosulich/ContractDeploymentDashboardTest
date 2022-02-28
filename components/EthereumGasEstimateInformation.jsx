import {
  getEthereumGasEstimate
} from '../lib'

import {
  BoldKeyAndValue
} from '.'

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
  }, [provider, contract, deploymentArguments])
  
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
        key="Gas"
        value={JSON.stringify(deploymentInfo)}
      />
    </div>
  )

}

export default EthereumGasEstimateInformation;