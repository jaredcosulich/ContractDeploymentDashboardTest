import {
  getEthereumGasEstimate,
  dateStringDiffToWords
} from '../lib'

import {
  SolidityContractConstructorForm
} from '.'

import { useEffect, useState } from 'react';

const ContractDeploymentDashboardContract = ({ provider, contract }) => {
  const [deploymentInfo, setDeploymentInfo] = useState();

  useEffect(() => {
    const getGasEstimate = async () => {
      console.log("CONTRACT", contract)
      const _deploymentInfo = await getEthereumGasEstimate(
        provider,
        contract.info.abi,
        contract.info.bytecode,
        [
          "SimpleURI",
          "SURI",
          "https://arweave.net/4usQHuUrIKOMahMjSlgYsPKjOp2wPSP8Z8Qs6NmcT_k/",
          "100000"
        ]
      );
      setDeploymentInfo(_deploymentInfo);
    }

    getGasEstimate()
  }, [provider, contract])
  

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
      <div className='text-xs'>
        <div className='text-sm font-bold'>
          Deployment Arguments
        </div>
        <SolidityContractConstructorForm  
          abi={contract.info.abi}
        />
      </div>
    </div>
  )

}

export default ContractDeploymentDashboardContract;