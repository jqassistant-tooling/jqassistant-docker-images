FROM jupyter/scipy-notebook:latest

RUN pip install neo4j py2neo ipython-cypher jupyter_contrib_nbextensions jupyter_dashboards pygal plotly holoviews
RUN jupyter contrib nbextension install --sys-prefix

RUN wget --directory-prefix=vis/lib https://d3js.org/d3.v4.min.js
RUN wget --directory-prefix=vis/lib https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js
RUN wget --directory-prefix=vis/lib https://kozea.github.com/pygal.js/javascripts/svg.jquery.js
RUN wget --directory-prefix=vis/lib https://kozea.github.io/pygal.js/2.0.x/pygal-tooltips.min.js

COPY vis vis
COPY jqassistant.ipynb .

EXPOSE 8888/tcp
