FROM jupyter/scipy-notebook:latest
RUN pip install neo4j py2neo ipython-cypher jupyter_contrib_nbextensions jupyter_dashboards pygal plotly holoviews bokeh
RUN jupyter contrib nbextension install --sys-prefix

COPY jqassistant.ipynb .

EXPOSE 8888/tcp
