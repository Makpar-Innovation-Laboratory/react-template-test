#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SCRIPT_NAME='entrypoint'
nl=$'\n'
SCRIPT_DES="Entrypoint script for the Docker container"

function log(){
    echo -e "\e[92m$(date +"%r")\e[0m: \e[4;32m$SCRIPT_NAME\e[0m : >> $1"
}

function help(){
    echo -e "\n\e[4m$SCRIPT_NAME\e[0m\n\n\t$SCRIPT_DES" 
}

log "Default Application Entrypoint" $SCRIPT_NAME

log "Substituting Environment Variables In \e[3mnginx.conf\e[0m" $SCRIPT_NAME
SUB_STR='$NGINX_PORT,$ROOT_DIR,$PROXY_HOST,$PROXY_PORT'
envsubst $SUB_STR < /etc/nginx/nginx.conf | sponge /etc/nginx/nginx.conf

log "Logging \e[3mnginx\e[0m Configuration" $SCRIPT_NAME
cat /etc/nginx/nginx.conf
echo "${nl}"

log "Starting \e[3mnginx\e[0m Server..." $SCRIPT_NAME
log "Server Started. Vist \e[3mlocalhost:$NGINX_PORT\e[0m to Access \e[7m$IMAGE_NAME\e[0m Splash Page." $SCRIPT_NAME
nginx -g "daemon off;"