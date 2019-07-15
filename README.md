# k8-elastic-workshop
Sample files for a workshop on kubernetes using Elastic

# Monitoring the cluster
We use filebeat & metric beat to monitor Nginx, Mysql and the application itself.
Filebeat DaemonSet: Nginx, Mysql, Application
Metricbeat DaemonSet: Nginx, Mysql
Deployment (1 Replica): KubeStateMetrics

To deploy:
> kubectl apply -f metricbeat_kubestatemetrics.yaml

> kubectl apply -f metricbeat.yaml

> kubectl apply -f filebeat.yaml