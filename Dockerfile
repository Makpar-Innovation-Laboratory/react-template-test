# ANGULAR BUILD
ARG ANGULAR_VERSION=12
FROM 894427396428.dkr.ecr.us-east-1.amazonaws.com/innolab-node:Dev as angular
# FROM node:16 AS angular

# DEPENDENCIES
RUN apt-get update -y && \
    apt-get install -y curl \
                        moreutils && \ 
    npm install -g @angular/cli@${ANGULAR_VERSION} && \
    mkdir /home/build/ && \
    mkdir /home/frontend/

COPY /frontend/ /home/frontend/
WORKDIR /home/frontend/

# --prod: Configured to output /home/build/
RUN npm install --force && \
    ng build --prod --output-hashing none

# PRODUCTION SERVER
FROM 894427396428.dkr.ecr.us-east-1.amazonaws.com/innolab-nginx:Dev
# FROM nginx:latest

# DEPENDENCIES && CONFIGURATION
RUN apt-get update -y && \
    apt-get install -y curl moreutils && \
    useradd -ms /bin/bash makpar && \
    groupadd admin && \
    usermod -a -G admin makpar && \
    mkdir /home/build/ && \
    mkdir /home/frontend/ && \
    mkdir /home/scripts

# COPY ARTIFACTS, CONFIGURATION AND SHELL SCRIPTS INTO IMAGE
COPY --chown=makpar:admin --from=angular /home/build/ /home/build/
COPY --chown=makpar:admin /conf/nginx.conf /etc/nginx/nginx.conf
COPY --chown=makpar:admin /conf/mime.types /etc/nginx/mime.types
COPY --chown=makpar:admin /scripts/docker/entrypoint/entrypoint.sh /home/scripts/entrypoint.sh

# PERMISSION CONFIGURATOIN
RUN chown -R makpar:admin /home/build/ /var/cache/nginx/ /var/run/ /var/log/nginx/ && \ 
    chmod -R 770 /home/build/

# ENTRYPOINT CONFIGURATION
EXPOSE 8080
USER makpar
ENTRYPOINT [ "bash", "/home/scripts/entrypoint.sh" ]