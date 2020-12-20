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

Spin up a Docker container using the following command providing the Neo4j URL including credentials as environment variable:

```
docker run -p8888:8888 -e NEO4J_URL=http://<neo4j_user>:<neo4j_password>@<neo4j_host>:7474 jqassistant/jupyter-notebook
```

The placeholder `<neo4j_host>` must be replaced by a hostname which can be reached from the docker container,
e.g. `http://neo4j:7474`, accordingly `<neo4j_user>` and `<neo4j_password>` must represent valid credentials. 

This environment variable can be used in notebooks for connecting to Neo4j:

```
neo4j_url=%env NEO4J_URL
%config CypherMagic.uri=neo4j_url + "/db/data"
```

**HINT** The Neo4j user and password must be omitted from the URL if authentication has been disabled for the database,
e.g. if the embedded Neo4j server from jQAssistant is started:

```
docker run -p8888:8888 -e NEO4J_URL=http://<neo4j_host>:7474 jqassistant/jupyter-notebook
```

The work directory can be mounted to a host directory (e.g. /local/work):

```
docker run -p8888:8888 -e NEO4J_URL=http://<neo4j_host>:7474 -v /local/work:/home/jovyan/work jqassistant/jupyter-notebook
```

For other configuration options (e.g. password authentication) refer to the [Jupyter Docker Stacks documentation](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/common.html).

