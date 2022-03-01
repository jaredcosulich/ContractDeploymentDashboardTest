import {
  SolidityContractDeployment
} from '.'

const SolidityContractDeployments = ({ deployments }) => {
  return (
    <div>
      <h2 className='font-bold py-3'>Deployments</h2>
      <div className='flex'>
        {deployments.sort(
          (a, b) => b.deployedAt - a.deployedAt
        ).map(
          (deployment, index) => (
            <SolidityContractDeployment
              key={`deployment-${index}`}
              deployment={deployment}
            />
          )
        )}
      </div>
    </div>
  )
}

export default SolidityContractDeployments;