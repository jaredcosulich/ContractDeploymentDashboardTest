import {
  SolidityABIFormInput
} from '.'

import { useState } from 'react'

const SolidityContractConstructorForm = ({ abi, onChange }) => {
  const [args, setArgs] = useState({})

  const constructor = abi.find(
    (item) => item.type === 'constructor'
  )

  const onInternalChange = (name, value) => {
    setArgs({
      ...args,
      [name]: value
    })

    const argCount = Object.keys(args).length
    if (argCount === constructor.inputs.length) {
      const orderedArgs = []
      for (const input of constructor.inputs) {
        orderedArgs.push(
          args[input.name]
        )
      }
      onChange(orderedArgs)
    } else {
      onChange(null)
    }
  }
  
  return (
    <div>
      {constructor.inputs.map(
        (input, index) => (
          <SolidityABIFormInput
            key={`abi-input-${index}`}
            className='py-1 first-letter:capitalize'
            abiInput={input}
            onChange={onInternalChange}
          />
        )
      )}
    </div>
  )

}

export default SolidityContractConstructorForm;