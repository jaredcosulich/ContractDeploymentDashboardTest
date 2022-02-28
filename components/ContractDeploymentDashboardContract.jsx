import {
  dateStringDiffToWords
} from '../lib'

import {
  SolidityContractConstructorForm,
  EthereumGasEstimateInformation
} from '.'

import { useState } from 'react';

const ContractDeploymentDashboardContract = ({ provider, contract }) => {
  const [deploymentArguments, setDeploymentArguments] = useState();
  
  const onArgsChange = (args) => {
    if (!args) {
      if (deploymentArguments) {
        setDeploymentArguments(args)
      }
      return;
    }

    args.forEach(
      (arg, index) => {
        if ((deploymentArguments || [])[index] !== arg) {
          setDeploymentArguments(args);
        }
      }
    ) 
  }

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
      <div className='flex text-xs'>   
        <div className='px-12'>
          <div className='text-sm font-bold'>
            Deployment Arguments
          </div>
          <SolidityContractConstructorForm  
            abi={contract.info.abi}
            onChange={onArgsChange}
          />
        </div>
        <div className='px-12'>
          <h2 className='mb-3'>
            Deploy Contract
          </h2>
          <EthereumGasEstimateInformation
            provider={provider}
            contract={contract}
            deploymentArguments={deploymentArguments}
          />
        </div>
      </div>
    </div>
  )

}

export default ContractDeploymentDashboardContract;