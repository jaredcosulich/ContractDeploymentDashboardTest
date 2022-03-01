import {
  SolidityContractDeployment
} from '.'

const SolidityContractDeployments = ({ deployments }) => {
  return (
    <div>
      <h2 className='font-bold pt-3'>Deployments</h2>
      <div className='text-xs pt-1'>
        Run `nod import` or `nod import [ADDRESS]` from any project to import contract information (networ, abi, and address).
        <br/>
        Example: `nod import {deployments[0].contractAddress}`
      </div>
      <div className='flex pt-3'>
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