# jQAssistant Jupyter Notebook

## Overview
This Docker image provides Jupyter notebooks to be used with jQAssistant for Software Analytics.

It is based on [jupyter/scipy-notebook](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-scipy-notebook)
and additionally includes the following pre-installed packages:

* neo4j 
* py2neo
* ipython-cypher 
* jupyter_contrib_nbextensions 
* jupyter_dashboards 
* pygal
* plotly
* holoviews

Furthermore it provides a template notebook with an example setup for connecting to a running Neo4j database.

## Usage

Spin up a Docker container using the following command: 

```
docker run -p8888:8888 jqassistant/jupyter-notebook
```

The work directory can be mounted to a host directory (e.g. /local/work):

```
docker run -p8888:8888 -v /local/work:/home/jovyan/work jqassistant/jupyter-notebook
```
