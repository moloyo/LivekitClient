@description('The location of the Redis Cache.')
param location string

resource redisCache 'Microsoft.Cache/Redis@2023-05-01-preview' = {
  name: 'redis-cache-eucharis'
  location: location
  properties: {
    redisVersion: '6.0'
    enableNonSslPort: true
    publicNetworkAccess: 'Enabled'
    sku: {
      name: 'Standard'
      family: 'C'
      capacity: 1
    }
    redisConfiguration: {
      'maxfragmentationmemory-reserved': '125'
      'maxmemory-delta': '125'
      'maxmemory-policy': 'volatile-lru'
      'maxmemory-reserved': '125'
    }
  }
  
}
