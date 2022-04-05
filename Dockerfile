# Build React application on top of a Node image
FROM node:latest AS application_build

COPY /frontend/ /home/app/
WORKDIR /home/app/
RUN npm install && npm run build

FROM nginx:latest

# See NOTE below
# COPY /scripts/docker/entrypoint.sh /home/entrypoint.sh
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy artifacts from Node build into nginx image
COPY --from=application_build /home/app/build/ .

# Start nginx in the foreground
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]