import {
  simpleApiCall
} from '../../lib'

import {
  ContractDeploymentDashboardTestLayout,
  TWCenteredContent,
  ConnectWalletButton,
  TWCircleSpinner,
  ContractDeploymentDashboardContract
} from '../../components'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const ContractDeploymentDashboardProjectPage = () => {
  const router = useRouter()
  const [provider, setProvider] = useState()
  const [project, setProject] = useState()
  
  useEffect(() => {
    const getProject = async () => {
      const { id } = router.query;
      const _project = await simpleApiCall(
        `projects/${id}`,
        'GET'
      )
      setProject(_project)
    }

    getProject()
  }, [router.query])
  
  return (
    <ContractDeploymentDashboardTestLayout>
      {!provider && 
      <TWCenteredContent>
        <div className='py-6'>
          <ConnectWalletButton
            network='rinkeby'
            onConnect={setProvider}
          />
        </div>
      </TWCenteredContent>
      }
      {!project &&
        <TWCircleSpinner
          message="Loading project..."
        />
      }
      {project &&
        <div>        
          <h2 className='text-lg mb-6'>
            <span className='font-bold mr-3'>
              Project:
            </span>
            {project.title}
          </h2>
          <div className='flex'>
            {project.contracts.map(
              (contract, index) => (
                <ContractDeploymentDashboardContract
                  key={`contract-${index}`}
                  provider={provider}
                  contract={contract}
                />
              )
            )}
          </div>
        </div>        
      }
    </ContractDeploymentDashboardTestLayout>
  )
}

export default ContractDeploymentDashboardProjectPage;