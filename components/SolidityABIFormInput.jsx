import { useState } from 'react';

const SolidityABIFormInput = ({ abiInput, className, onChange }) => {
  const [value, setValue] = useState("")

  const getInputType = () => {
    switch (abiInput.type) {
      case 'string':
        return 'text';
      case 'uint256':
        return 'number'
      
    }
  }

  console.log(abiInput)

  const internalChange = (newValue) => {
    setValue(newValue)
    onChange(abiInput.name, newValue)
  }

  return (
    <div className={className}>
      <span className='mr-1 font-semibold'>
        {abiInput.name}: 
      </span>
      <input 
        className='border px-3 py-1'
        type={getInputType()} 
        onChange={internalChange} 
      />
    </div>
  )

}

export default SolidityABIFormInput;