import {
  dateStringDiffToWords
} from '../lib'



const ContractDeploymentDashboardContract = ({ contract }) => {



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