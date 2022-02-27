import {
  getEthereumGasEstimate,
  dateStringDiffToWords
} from '../lib'

import { useEffect, useState } from 'react';

const ContractDeploymentDashboardContract = ({ contract }) => {
  const [deploymentInfo, setDeploymentInfo] = useState();

  useEffect(() => {
    const getGasEstimate = async () => {
      // G
      const _deploymentInfo = await getEthereumGasEstimate(

      );
      setDeploymentInfo(_deploymentInfo);
    }

    getGasEstimate()
  })
  

  return (
    <div className='border p-3'>
      <h3 className='font-bold mb-3'>
        {contract.name}
      </h3>
      <div className='text-xs'>
        <span className='font-semibold mr-1'>
          Compiled: 
        </span>
        {dateStringDiffToWords(contract.compiledAt)}
      </div>
    </div>
  )

}

export default ContractDeploymentDashboardContract;