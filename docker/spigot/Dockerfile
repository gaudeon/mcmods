FROM jeanblanchard/java

RUN apk upgrade --update && \
    apk add bash && \
    apk add rsync

ENV MC_OPT  /opt/minecraft
ENV MC_WORK /minecraft

WORKDIR ${MC_WORK}

# spigot
ADD server/spigot_server-1.8.jar ${MC_OPT}/spigot_server.jar

# mqtt
ADD plugins/sc-mqtt.jar ${MC_OPT}/sc-mqtt.jar

# scriptcraft
ADD plugins/scriptcraft-3.1.12.jar ${MC_OPT}/plugins/scriptcraft.jar

# no spawn chunks
ADD plugins/NoSpawnChunks.jar ${MC_OPT}/plugins/NoSpawnChunks.jar

# clear lag
ADD plugins/Clearlag.jar ${MC_OPT}/plugins/Clearlag.jar

# default minecraft server configuration
ADD config/server.properties ${MC_OPT}/server.properties
ADD config/permissions.yml ${MC_OPT}/permissions.yml
RUN /bin/sh -c 'echo "eula=true" > ${MC_OPT}/eula.txt'

# external port access
EXPOSE 25565

# shared volume
VOLUME ["/minecraft"]

# copy opt to shared volume
RUN /bin/sh -c "echo 'rsync -a --ignore-existing ${MC_OPT}/ ${MC_WORK}/' >> /usr/bin/mcserver"
RUN /bin/sh -c "echo 'java -Xmx4096M -classpath ${MC_WORK}/sc-mqtt.jar -jar ${MC_WORK}/spigot_server.jar' >> /usr/bin/mcserver"
RUN /bin/sh -c "chmod +x /usr/bin/mcserver"

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
