FROM jeanblanchard/java

RUN apk upgrade --update && \
    apk add bash && \
    apk add rsync

ENV MC_OPT  /opt/minecraft
ENV MC_WORK /minecraft

WORKDIR ${MC_WORK}

# canary mod canarymod.net
# ADD https://canarymod.net/releases/CanaryMod-1.8.0-1.2.0-RC1.jar ${MC_OPT}/canarymod.jar
ADD server/CanaryMod-1.8.0-1.2.0-RC1.jar ${MC_OPT}/canarymod.jar

# mqtt
# ADD http://scriptcraftjs.org/download/extras/mqtt/sc-mqtt.jar ${MC_OPT}/sc-mqtt.jar
ADD server/sc-mqtt.jar ${MC_OPT}/sc-mqtt.jar

# scriptcraft
# ADD http://scriptcraftjs.org/download/latest/scriptcraft-3.1.12/scriptcraft.jar ${MC_OPT}/plugins/scriptcraft.jar
ADD plugins/scriptcraft-3.1.12.jar ${MC_OPT}/plugins/scriptcraft.jar

# default minecraft server configuration
ADD config/server.cfg ${MC_OPT}/config/server.cfg
ADD config/ops.cfg ${MC_OPT}/config/ops.cfg
ADD config/worlds/default/default_NORMAL.cfg ${MC_OPT}/config/worlds/default/default_NORMAL.cfg
RUN /bin/sh -c 'echo "eula=true" > ${MC_OPT}/eula.txt'

# external port access
EXPOSE 25565

# shared volume
VOLUME ["/minecraft"]

# copy opt to shared volume
RUN /bin/sh -c "echo 'rsync -a --ignore-existing ${MC_OPT}/ ${MC_WORK}/' >> /usr/bin/mcserver"
RUN /bin/sh -c "echo 'java -Xmx4096M -jar ${MC_WORK}/canarymod.jar' >> /usr/bin/mcserver"
RUN /bin/sh -c "chmod +x /usr/bin/mcserver"

# start the server
CMD /usr/bin/mcserver

# Sample commands
# docker build -t scriptcraftjs .  
# docker run -it -p 25565:25565 -v <local dir>:/minecraft --rm scriptcraftjs
#
# if you can't see the server and you are using boot2docker from homebrew on Mac OS X:
#
# VBoxManage controlvm boot2docker-vm natpf1 “tcp-port-25565,tcp,127.0.0.1,25565,,25565”
#
# see https://github.com/docker/docker/issues/4007 for more details...
