FROM debian:bookworm-slim

#https://repo1.maven.org/maven2/com/buschmais/jqassistant/cli/jqassistant-commandline-neo4jv5/2.6.0/jqassistant-commandline-neo4jv5-2.6.0-distribution.zip
ENV jqa_version=2.6.0
ENV jqa_cmdline_sha1=821a5315e1a77223d19f365f9543373ddb294308
ENV jqa_distfile_prefix=jqassistant-commandline-neo4jv5
ENV jqa_distfile_suffix=distribution.zip

ENV SERVER="https://repo1.maven.org"
ENV PATH_SEGMENT="/maven2/com/buschmais/jqassistant/cli/${jqa_distfile_prefix}/${jqa_version}/"
ENV ARTIFACT="${jqa_distfile_prefix}-${jqa_version}-${jqa_distfile_suffix}"
ENV FULL_URL="${SERVER}${PATH_SEGMENT}${ARTIFACT}"

# https://github.com/hadolint/hadolint/wiki/DL3009
# hadolint ignore=DL3009
RUN set -ex; \
    apt-get -y update

RUN set -ex; \
    apt-get -y install --no-install-recommends \
        ca-certificates \
        coreutils \
        curl \
        unzip

RUN set -ex; \
    apt-get install -y --no-install-recommends \
        openjdk-17-jre

RUN  apt-get clean \
     && rm -rf /var/lib/apt/lists/*

#
# Be a good guy and do all jQAssistant specific stuff as dedicated user
#
RUN set -ex; \
    groupadd -r jqa --gid=11112; \
    useradd -r -g jqa --uid=11112 --home-dir=/opt/jqa --shell=/bin/bash jqa; \
    mkdir -p -v /opt/jqa; \
    chown -R jqa:jqa /opt/jqa

RUN set -ex; \
    mkdir -p /workspace; \
    chown -R jqa:jqa /workspace;

WORKDIR /tmp

RUN set -ex; \
    curl --silent --show-error --output distribution.zip $FULL_URL

RUN set -ex; \
    printf "%s  %s" ${jqa_cmdline_sha1} distribution.zip > check-sums.dat; \
    sha1sum -c check-sums.dat

RUN set -ex; \
    unzip distribution.zip; \
    mv -v ${jqa_distfile_prefix}-${jqa_version}/* /opt/jqa; \
    rm -r -v -f distribution.zip check-sums.dat; \
    chown -R jqa:jqa /opt/jqa

EXPOSE 7474
EXPOSE 7687

USER jqa

VOLUME ["/workspace"]
WORKDIR /workspace

ENTRYPOINT ["/opt/jqa/bin/jqassistant.sh"]

CMD ["--help"]