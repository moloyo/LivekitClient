# AKS + Azure Redis Cache deployment using Bicep

To start, we need to be logged in on Azure; run `az login`.

You will need to create an SSH key pair, as is mentioned [in the official documentation](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-bicep?tabs=azure-cli#create-an-ssh-key-pair), there are two ways to create an SSH key pair:

### Create an SSH key pair using Azure CLI
`az sshkey create --name "mySSHKey" --resource-group "myResourceGroup"`

### Create an SSH key pair using ssh-keygen
`ssh-keygen -t rsa -b 4096`

When your key is created, you need to assign it to the `sshRSAPublicKey` params on [main.bicep](main.bicep).

Now you are ready to start your deployment.

### Run the deployment command
`az deployment sub create --template-file main.bicep --location your-location`
