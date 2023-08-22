@description('The name of the Managed Cluster resource.')
param clusterName string = 'aks-cluster-eucharis'

@description('The location of the Managed Cluster resource.')
param location string

@description('Optional DNS prefix to use with hosted Kubernetes API server FQDN.')
param dnsPrefix string = 'myakscluster'

@description('User name for the Linux Virtual Machines.')
param linuxAdminUsername string = 'azureuser'

@description('Configure all linux machines with the SSH RSA public key string. Your key should include three parts, for example \'ssh-rsa AAAAB...snip...UcyupgH azureuser@linuxvm\'')
param sshRSAPublicKey string


resource aks 'Microsoft.ContainerService/managedClusters@2022-05-02-preview' = {
  name: clusterName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  sku: {
    name: 'Basic'
    tier: 'Free'
  }
  properties: {
    kubernetesVersion: '1.26.6'
    dnsPrefix: dnsPrefix
    agentPoolProfiles: [
      {
        name: 'nodepool1'
        type: 'VirtualMachineScaleSets'
        osDiskSizeGB: 128
        count: 3
        vmSize: 'Standard_DS2_v2'
        osType: 'Linux'
        osSKU: 'Ubuntu'
        osDiskType: 'Managed'
        kubeletDiskType: 'OS'
        maxPods: 110
        mode: 'System'
        enableAutoScaling: false
        powerState: {
          code: 'Running'
        }
        orchestratorVersion: '1.26.6'
        enableNodePublicIP: true
        enableEncryptionAtHost: false
        enableUltraSSD: false
        enableFIPS: false
      }
    ]
    linuxProfile: {
      adminUsername: linuxAdminUsername
      ssh: {
        publicKeys: [
          {
            keyData: sshRSAPublicKey
          }
        ]
      }
    }
  }
}
