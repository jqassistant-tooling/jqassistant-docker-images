FROM eclipse-temurin:11-alpine

# Be a good guy and do all jQAssistant specific stuff as dedicated user
RUN adduser --home /opt/jqa --shell /bin/bash -D jqa jqa;

RUN mkdir -p /repository; \
    chown -R jqa:jqa /repository; \
    mkdir -p /workspace; \
    chown -R jqa:jqa /workspace;

COPY --chown=jqa:jqa maven/.jqassistant.yml /opt/jqa
COPY --chown=jqa:jqa maven/distribution/jqassistant-commandline-distribution-@com.buschmais.jqassistant.version@/ /opt/jqa/

RUN chmod u+x /opt/jqa/bin/jqassistant.sh

WORKDIR /workspace
# Initial run to download default plugins
RUN /opt/jqa/bin/jqassistant.sh help

USER jqa
VOLUME ["/workspace"]

EXPOSE 7474
EXPOSE 7687

ENTRYPOINT ["exec /opt/jqa/bin/jqassistant.sh"]
