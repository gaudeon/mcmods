FROM jeanblanchard/java

RUN apk upgrade --update && \
    apk add bash && \
    apk add curl && \
    apk add git && \
    apk add rsync

ENV MC_OPT  /opt/minecraft
ENV MC_WORK /minecraft
ENV BUILDTOOLS_URL https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
ENV SCRIPTCRAFT_URL http://scriptcraftjs.org/download/latest/scriptcraft-3.2.0/scriptcraft.jar

WORKDIR ${MC_WORK}

# minecraft dir
RUN /bin/bash -c 'mkdir ${MC_OPT}'

# plugins dir
RUN /bin/bash -c 'mkdir ${MC_OPT}/plugins'

# spigot
RUN /bin/bash -c '/usr/bin/curl -o ${MC_OPT}/BuildTools.jar ${BUILDTOOLS_URL}'
RUN /bin/bash -c 'java -jar ${MC_OPT}/BuildTools.jar'
RUN /bin/bash -c 'mv /minecraft/spigot*.jar ${MC_OPT}/spigot.jar'
RUN /bin/bash -c 'mv /minecraft/craftbukkit*.jar ${MC_OPT}/craftbukkit.jar'

# scriptcraft
RUN /bin/bash -c 'curl -o ${MC_OPT}/plugins/scriptcraft.jar ${SCRIPTCRAFT_URL}'

# default minecraft server configuration
ADD config/server.properties ${MC_OPT}/server.properties
ADD config/permissions.yml ${MC_OPT}/permissions.yml
RUN /bin/bash -c 'echo "eula=true" > ${MC_OPT}/eula.txt'

# external port access
EXPOSE 25565

# shared volume
VOLUME ["/minecraft"]

# copy opt to shared volume
RUN /bin/bash -c "echo 'rsync -a --ignore-existing ${MC_OPT}/ ${MC_WORK}/' >> /usr/bin/mcserver"
RUN /bin/bash -c "echo 'java -Xmx4096M -classpath ${MC_WORK}/sc-mqtt.jar -jar ${MC_WORK}/spigot.jar' >> /usr/bin/mcserver"
RUN /bin/bash -c "chmod +x /usr/bin/mcserver"

# start the server
CMD /usr/bin/mcserver

# Sample commands
# docker build -t spigot-scriptcraftjs .  
# docker run -it -p 25565:25565 -v <local dir>:/minecraft --rm spigot-scriptcraftjs
#
# if you can't see the server and you are using boot2docker from homebrew on Mac OS X:
#
# VBoxManage controlvm boot2docker-vm natpf1 “tcp-port-25565,tcp,127.0.0.1,25565,,25565”
#
# see https://github.com/docker/docker/issues/4007 for more details...
