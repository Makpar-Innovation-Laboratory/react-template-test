# Build React application on top of a Node image
FROM 894427396428.dkr.ecr.us-east-1.amazonaws.com/innolab-node:Dev AS application_build

COPY /frontend/ /home/app/
WORKDIR /home/app/
RUN npm install && npm run build

FROM 894427396428.dkr.ecr.us-east-1.amazonaws.com/innolab-nginx:Dev

# See NOTE below
# COPY /scripts/docker/entrypoint.sh /home/entrypoint.sh
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy artifacts from Node build into nginx image
COPY --from=application_build /home/app/build/ .

# Start nginx in the foreground
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
