import {
  ContractDeploymentDashboardHeader
} from '.'

const ContractDeploymentDashboardTestLayout = ({ children }) => {

  return (
    <div className='container'>
      <ContractDeploymentDashboardHeader />
      {children}
    </div>
  )

}

export default ContractDeploymentDashboardTestLayout