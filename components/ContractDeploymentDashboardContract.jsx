import {
  simpleApiCall,
  dateStringDiffToWords
} from '../lib'

import {
  SolidityContractConstructorForm,
  EthereumGasEstimateInformation,
  DeploySolidityContractButton,
  SolidityContractDeployments
} from '.'

import { useMemo, useState } from 'react';

const ContractDeploymentDashboardContract = ({ provider, contract }) => {
  const [deploymentArguments, setDeploymentArguments] = useState();
  const [activeContract, setActiveContract] = useState(contract);
  
  const orderedArgumentValues = useMemo(() => {
    if (!deploymentArguments) return null;
    
    return deploymentArguments.map(
      (argument) => argument.value
    );
  }, [deploymentArguments]);

  const onArgsChange = (args) => {
    if (!args) {
      if (deploymentArguments) {
        setDeploymentArguments(args)
      }
      return;
    }

    const newArg = args.find(
      (arg, index) => ((deploymentArguments || [])[index]?.value !== arg.value)
    ) 
    if (newArg) {
      setDeploymentArguments(args);
    }
  }

  const onDeploy = async (receipt) => {
    const { chainId } = await provider.getNetwork()

    const updatedContract = {
      ...contract,
      info: {
        ...contract.info,
        deployments: [
          ...(contract.info.deployments || []),
          {
            network: chainId,
            deployedAt: Date.now(),
            deploymentArguments: deploymentArguments,
            ...receipt,
          }
        ]
      }
    }

    setActiveContract(updatedContract)

    const response = await simpleApiCall(
      `contracts/${contract.id}`,
      'POST',
      updatedContract
    )

    setActiveContract(response)
  }

  return (
    <div>
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
            <h2 className='text-sm font-bold mb-3'>
              Deployment Arguments
            </h2>
            <SolidityContractConstructorForm  
              abi={contract.info.abi}
              onChange={onArgsChange}
            />
          </div>
          <div className='px-12'>
            <h2 className='text-sm font-bold mb-3'>
              Deploy Contract
            </h2>
            <EthereumGasEstimateInformation
              provider={provider}
              contract={contract}
              deploymentArguments={orderedArgumentValues}
            />
            {deploymentArguments && (
              <div className='mt-6'>
                <DeploySolidityContractButton
                  provider={provider}
                  abi={contract.info.abi}
                  bytecode={contract.info.bytecode}
                  deploymentArguments={orderedArgumentValues}
                  onDeploy={onDeploy}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='pt-3'>
        <SolidityContractDeployments
          deployments={activeContract.info?.deployments || []}
        />
      </div>
    </div>

  )

}

export default ContractDeploymentDashboardContract;