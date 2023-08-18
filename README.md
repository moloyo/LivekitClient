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

## Deploying Livekit server over Azure Kubernetes Service

The folder [aks](./aks/) contains files that can be used to deploy Livekit server over and AKS cluster. For this particular case we did not fully used helm to perform the installation, rather, we rendered the chart for Livekit using a values file for Digital Ocean and placed the output in the [render-no-turn.yml](./aks/render-no-turn.yml) file.

The following steps assume you already have a working AKS Cluster and performed the configuration for kubectl tool to connect to it, also, you'll need a Redis Cache Server in Azure with public access and non-tls port enabled:

- First we install the NGINX Ingress in the cluster:

```
helm install ingress-nginx ingress-nginx/ingress-nginx \
    --set controller.replicaCount=1 \
    --set controller.nodeSelector."kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux \
    --set controller.service.externalTrafficPolicy=Local
```

- Then we install the cert manager:

```
kubectl label namespace default cert-manager.io/disable-validation=true

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.crds.yaml

helm install cert-manager jetstack/cert-manager --version v1.7.1

```

- At this point we require to install the Cluster Issuer service from the [cluster_issuer.yaml](./aks/cluster_issuer.yaml) file:

```
kubectl apply -f cluster_issuer.yaml
```

- Finally, install the livekit service and ingress from the [render-no-turn.yml](./aks/render-no-turn.yml) file:

```
kubectl apply -f render-no-turn.yml
```

With those steps all required elements are in place for the service to work, you must observe several important things:


- First, the NGINX controller installed in the first step acts every time an ingress is created in the cluster and associates it with a Load Balancer that is automatically created in Azure. Usually the Load Balancer is named as _kubernetes_ and placed in a resources group with a name like *mc_CLUSTERRGNAME_CLUSTERNAME_CLUSTERREGION*.

- When the Livekit Service is deployed an SSL certificate is created and validated against the cluster, that's why you may see an ephemeral listener service, you can check that the certificate was properly created by running the command _kubectl get cert_, the certificate must be in READY status.

- There's a Liveness and Readyness probes configured for the service, the delay time for the cluster to run those checks the first time was set to 120 seconds, until those probes aren't passed the pods won't get to the Ready status, so you will have to wait at least that time before the service is fully up and running.

- If you experience trouble, you can troubleshoot getting the logs of the livekit pods with the following commands:

```
kubectl get pods # Gets all pods in cluster

kubectl logs POD_ID # Gets logs of the given pod
```

If you get a CrashLoopBack error it's likely to be an error connecting to the REDIS server
A Failure to perform a GET against the node IP for readiness probe may be a delay time too short.

### Rendering the Helm chart

The how we got the files to deploy the Livekit server without using Helm was as follows:

- We assume you have already helm installed in your machine

- Add the Livekit repo to your helm with the following command:

```
helm repo add livekit https://helm.livekit.io
```

- Render the repo using the [do-server-yaml](./aks/do-server.yaml) file by running the following command:

```
helm template livekit/livekit-server --values do-server.yaml
```

- Save the output of the console in a yaml file and use with the _kubectl apply_ command.
