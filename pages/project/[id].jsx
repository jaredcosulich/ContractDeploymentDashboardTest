import {
  simpleApiCall
} from '../../lib'

import {
  ContractDeploymentDashboardTestLayout,
  TWCircleSpinner
} from '../../components'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const ContractDeploymentDashboardProjectPage = () => {
  const router = useRouter()
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
      {!project &&
        <TWCircleSpinner
          message="Loading project..."
        />
      }
      {project &&
        <div>        
          <h2 className='text-lg'>
            {project.title}
          </h2>
          {project.contracts.map(
            (contract) => (
              <div key={`contract-${index}`}>
                {contract.name}
              </div>
            )
          )}
        </div>        
      }
    </ContractDeploymentDashboardTestLayout>
  )
}

export default ContractDeploymentDashboardProjectPage;