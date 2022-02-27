import {
  getEthereumGasEstimate,
  dateStringDiffToWords
} from '../lib'

import {
  SolidityContractConstructorForm
} from '.'

import { useEffect, useState } from 'react';

const ContractDeploymentDashboardContract = ({ provider, contract }) => {
  const [deploymentArguments, setDeploymentArguments] = useState();
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
  

  return (
    <div className='border p-3'>
      <h3 className='font-bold mb-3'>
        {contract.name}
      </h3>
      <div className='text-xs mb-6'>
        <span className='font-semibold mr-1'>
          Compiled: 
        </span>
        {dateStringDiffToWords(contract.compiledAt)}
      </div>
      <div className='flex'>   
        <div className='px-12 text-xs'>
          <div className='text-sm font-bold'>
            Deployment Arguments
          </div>
          <SolidityContractConstructorForm  
            abi={contract.info.abi}
            onChange={setDeploymentArguments}
          />
        </div>
        <div className='px-12'>
          <h2 className='mb-3'>
            Deploy Contract
          </h2>
          {!deploymentInfo &&
            <div className='text-xs py-6'>
              Provide deployment arguments to get
              <br/>
              an estimate on gas or deploy the contract.
            </div>
          }
          {deploymentInfo &&
            JSON.stringify(deploymentInfo)
          }
        </div>
      </div>
    </div>
  )

}

export default ContractDeploymentDashboardContract;