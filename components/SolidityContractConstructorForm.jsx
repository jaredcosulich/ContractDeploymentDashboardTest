import {
  SolidityABIFormInput
} from '.'

const SolidityContractConstructorForm = ({ abi }) => {

  const constructor = abi.find(
    (item) => item.type === 'constructor'
  )

  const onChange = (name, value) => {
    console.log(name, value)
  }
  
  return (
    <div>
      {constructor.inputs.map(
        (input, index) => (
          <SolidityABIFormInput
            key={`abi-input-${index}`}
            className='py-1 first-letter:capitalize'
            abiInput={input}
            onChange={onChange}
          />
        )
      )}
    </div>
  )

}

export default SolidityContractConstructorForm;