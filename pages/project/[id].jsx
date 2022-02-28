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
    const { id } = router.query;
    if (!id) return;

    const getProject = async () => {
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
              onConnect={setProvider}
            />
          </div>
        </TWCenteredContent>
      }
      {provider && !project &&
        <TWCircleSpinner
          message="Loading project..."
        />
      }
      {provider && project &&
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