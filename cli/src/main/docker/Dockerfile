FROM eclipse-temurin:11-alpine

RUN apk add --no-cache tini

# Be a good guy and do all jQAssistant specific stuff as dedicated user
RUN adduser --home /opt/jqa --shell /bin/bash --disabled-password jqa;

RUN mkdir -p /repository; \
    chown -R jqa:jqa /repository; \
    mkdir -p /workspace; \
    chown -R jqa:jqa /workspace;

COPY --chown=jqa:jqa maven/distribution/jqassistant-commandline-distribution-${com.buschmais.jqassistant.version}/ /opt/jqa/
RUN chmod u+x /opt/jqa/bin/jqassistant.sh

COPY --chown=jqa:jqa maven/.jqassistant.yml /opt/jqa

USER jqa
WORKDIR /workspace
# Initial run to download default plugins
RUN /opt/jqa/bin/jqassistant.sh help

VOLUME ["/workspace"]

EXPOSE 7474
EXPOSE 7687

ENTRYPOINT ["tini", "--", "/opt/jqa/bin/jqassistant.sh"]
