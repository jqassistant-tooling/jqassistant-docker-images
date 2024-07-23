FROM jupyter/minimal-notebook:latest

RUN pip install neo4j py2neo pandas matplotlib pygal plotly holoviews bokeh import-ipynb hide_code[lab]
RUN jupyter lab build

RUN wget --directory-prefix=vis/lib https://d3js.org/d3.v4.min.js
RUN wget --directory-prefix=vis/lib https://cdn.jsdelivr.net/npm/lodash/lodash.min.js

COPY maven/vis vis
COPY maven/examples/example-visualizations.ipynb examples/

EXPOSE 8888/tcp

