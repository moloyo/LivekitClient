targetScope = 'subscription'

param location string = 'centralus'

resource newResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-eucharis'
  location: location
}

module aks 'aks.bicep' = {
  name: 'aks-cluster-eucharis'
  scope: newResourceGroup
  params: {
    location: location
    linuxAdminUsername: 'azureuser'
    sshRSAPublicKey: ''
  }
}

module redis 'redisCache.bicep' = {
  name: 'redis-cache-eucharis'
  scope: newResourceGroup
  params: {
    location: location
  }
}

output aksName string = aks.name
output redisName string = redis.name
