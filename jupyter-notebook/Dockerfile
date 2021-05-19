FROM jupyter/minimal-notebook:latest

RUN pip install neo4j py2neo ipython-cypher pandas pygal plotly holoviews

RUN wget --directory-prefix=vis/lib https://d3js.org/d3.v4.min.js
RUN wget --directory-prefix=vis/lib https://cdn.jsdelivr.net/npm/lodash/lodash.min.js
RUN wget --directory-prefix=vis/lib https://kozea.github.io/pygal.js/javascripts/svg.jquery.js
RUN wget --directory-prefix=vis/lib https://kozea.github.io/pygal.js/2.0.x/pygal-tooltips.min.js

COPY vis vis
COPY examples/vis.ipynb examples/

EXPOSE 8888/tcp

