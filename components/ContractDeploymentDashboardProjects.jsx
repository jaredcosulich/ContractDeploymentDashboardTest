import {
  simpleApiCall
} from '../lib'

import {
  TWCircleSpinner,
  ContractDeploymentDashboardProjectsNewButton,
  ContractDeploymentDashboardProjectsCreateButton
} from '.'

import { useEffect, useState } from 'react';

const ContractDeploymentDashboardProjects = () => {
  const [projects, setProjects] = useState()

  useEffect(() => {
    const getProjects = async () => {
      const _projects = await simpleApiCall(
        'projects',
        'GET'
      )
      console.log("PROJECTS", _projects)
      setProjects(_projects)
    }

    getProjects()
  })

  return (
    <div className=''>
      <h2 className='text-lg mb-3'>Projects</h2>
      <div className='p-3 border border-slate-800'>
        {!projects &&
          <TWCircleSpinner
            message="Loading projects..."
          />
        }
        {projects && projects.map(
          (project, index) => (
            <div key={`project-${index}`}>{project.name}</div>
          )
        )}
        <ContractDeploymentDashboardProjectsNewButton />
        <ContractDeploymentDashboardProjectsCreateButton />
      </div>
    </div>
  )
}

export default ContractDeploymentDashboardProjects;