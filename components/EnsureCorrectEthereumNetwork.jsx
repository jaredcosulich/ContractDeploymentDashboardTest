import {
  TWCircleSpinner,
  WrongEthereumNetworkMessage
} from '.'

import { useEffect, useState } from 'react';

const EnsureCorrectEthereumNetwork = ({ provider, network, onCorrectNetwork }) => {
  const [wrongNetwork, setWrongNetwork] = useState();

  useEffect(() => {
    const getActiveNetwork = async () => {
      const _activeNetwork = await provider.getNetwork()

      if (_activeNetwork) {
        if (_activeNetwork === network) {
          onCorrectNetwork()
        } else {
          setWrongNetwork(_activeNetwork.name)
        }
      }
    }

    getActiveNetwork();
  }, [provider, network])

  if (!wrongNetwork) {
    return (
      <TWCircleSpinner
        message="Checking the network..."
      />
    )
  }

  return (
    <WrongEthereumNetworkMessage 
      badNetwork={wrongNetwork}
      goodNetwork={network}
    />
  )
}

export default EnsureCorrectEthereumNetwork;