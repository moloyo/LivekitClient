@description('The location of the Redis Cache.')
param location string

resource redisCache 'Microsoft.Cache/Redis@2019-07-01' = {
  name: 'redis-cache-eucharis'
  location: location
  properties: {
    sku: {
      name: 'Basic'
      family: 'C'
      capacity: 0
    }
  }
}
