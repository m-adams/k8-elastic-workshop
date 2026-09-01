> [!WARNING]
> **Archived and unmaintained.** This repository holds material from a
> workshop last run in January 2023. The sample application in `app_src/`
> pins 2019-era dependencies (`react-scripts` 2, `react` 16, `node-sass` 4,
> `Flask` 1.0.2, `requests` 2.21.0) and carries a large number of known
> vulnerabilities, including criticals. It is kept public for reference
> only — **do not deploy it, and do not use its manifests as a starting
> point for anything you intend to run.** The Kubernetes and Beats
> configuration is still useful reading; the app is not.

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