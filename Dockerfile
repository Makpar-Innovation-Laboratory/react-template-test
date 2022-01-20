# Build React application on top of a Node image
FROM 894427396428.dkr.ecr.us-east-1.amazonaws.com/innolab-node:Dev AS application_build

COPY /frontend/ /home/app/
WORKDIR /home/app/
ENV NODE_OPTIONS=--openssl-legacy-provider
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

# NOTE: If the process managing the container needs more specific configuration than is provided in the Docker image, then perform it in the entrypoint script. This script is executed as the container spins up, so if you need to execute a task within the containerized environment (not the image build environment), those instructions would go in the entrypoint.
# ENTRYPOINT [ "/home/entrypoint.sh"]