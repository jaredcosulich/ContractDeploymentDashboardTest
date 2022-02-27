const ethereumNetworkCommonName = (networkIdOrName) => {
  switch (networkIdOrName) {
    case 'homestead':
      return 'Mainnet';
    case 'ropsten':
      return 'Ropsten';
    case 'rinkeby':
      return 'Rinkeby';
  }
}

export default ethereumNetworkCommonName;