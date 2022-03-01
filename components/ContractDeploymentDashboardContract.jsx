import {
  dateStringDiffToWords,
  ethereumNetworkIdToName,
  simpleApiCall
} from '../lib'

import {
  SolidityContractConstructorForm,
  EthereumGasEstimateInformation,
  DeploySolidityContractButton,
  BoldKeyAndValue
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

    args.forEach(
      (arg, index) => {
        if ((deploymentArguments || [])[index] !== arg) {
          setDeploymentArguments(args);
        }
      }
    ) 
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
        <h2 className='font-bold py-3'>Deployments</h2>
        <div className='flex'>
          {(activeContract.info?.deployments || []).sort(
            (a, b) => b.deployedAt - a.deployedAt
          ).map(
            (deployment, index) => (
              <div 
                key={`deployment-${index}`}
                className='border p-3 mr-3 text-sm'
              >
                <div className='font-bold'>
                  {ethereumNetworkIdToName(deployment.network)}: 
                  &nbsp;
                  {dateStringDiffToWords(deployment.deployedAt)}
                </div>
                <div className='text-xs pt-3'>
                  <BoldKeyAndValue
                    title="Address"
                    value={deployment.contractAddress}
                  />
                  <BoldKeyAndValue
                    title="Gas Used"
                    value={JSON.stringify(deployment.gasUsed)}
                  />
                  <BoldKeyAndValue
                    title="Cost"
                    value={JSON.stringify(deployment.effectiveGasPrice)}
                  />
                  <BoldKeyAndValue
                    title="Arguments"
                    value={(
                      <div className='pl-3'>
                        {deployment.deploymentArguments.map(
                          (arg, argIndex) => (
                            <BoldKeyAndValue
                              key={`deployment-arg-${index}-${argIndex}`}
                              title={arg.name || argIndex + 1}
                              value={arg.value || arg}
                            />
                          )
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>

  )

}

export default ContractDeploymentDashboardContract;