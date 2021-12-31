# InnoLab Frontend

The Innovation Lab repository, *innolab-frontend*, is a [Single-Page-Application](https://en.wikipedia.org/wiki/Single-page_application) created in [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/). The application can be configured to deploy to two different sets of infrastructure.

If the application is containerized through an **nginx** image, it can be deployed to an **AWS ECS Fargate** cluster. The *devops/buildspec.ecs.yml* and *devops/appspec.yml* contains the necessary steps for **CodePipeline** and **CodeDeploy** to build and deploy the container to the Innovation Lab cluster through a blue-green deployment.

If the application is transpiled into javascript webpacks directly, it can be deployed to an **AWS S3 bucket** hooked into a **CloudFront distribution**. The workflow for this deployment has been captured in two different pipelines, both a **CodePipeline** and a **Bitbucket** pipeline. The *devops/buildspec.s3-cloudfront.yml* contains the necessary steps for a **CodePipeline** deployment. The *devops/bitbuckets-pipeline.s3-cloudfront.yml* contains the necessary steps for a **Bitbucket** deployment.

## Quickstart

### Local
To get the *innolab-frontend* up and running through a local development server on your machine, follow these steps:

0. Clone the *innolab-frontend* repository and `cd` into it,

```shell
git clone ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/innolab-frontend
cd innolab-frontend
```

1. Install the [NodeJS](https://nodejs.org/en/download/) dependencies in the */frontend/package.json* through the Node package manager,

```shell
cd frontend
npm install
```

3. Adjust the */frontend/src/environment/environment.ts* file. If you do not have the backend server running, set the `mock` attribute to `true` in order to spoof authentication and service calls,

```javascript
export const environment = {
  host: 'localhost:8000',
  mock: true,
  production: false
};
```

**NOTE**: If `mock==true`, then the `host` does not matter.

4. Start a local development server on *localhost:4200*,

```shell
ng serve
```

**NOTE**: This command must be run from the same directory as the *package.json*

### Container
The app can be containerized through a multi-stage [Docker](https://docs.docker.com/) image. It is first built on top of a [NodeJS](https://nodejs.org/en/download/) image with the `ng build` command and the resulting artifacts copied over into an [nginx](https://www.nginx.com/) image. 

If the backend container is also running, the **nginx** container can be configured to proxy requests made on the */api* path to the backend container, i.e. service calls made by the Angular app go back to their origination point and the proxy handles interfacing with the backend endpoints. This implementation hides the backend from the end user and provides better security. 

The frontend container can also be configured to run by itself, without proxy serving requests on */api*. In this case, the frontend service calls will not function unless they are pointed directly to the backend. It is **not** recommended to run the frontend application like this in production, but it is an easy way to test the frontend without running the full stack.

Before the image for either case is built, the *env/.env* file must be configured. Copy the sample file into a new file and adjust the variables.

```shell
cp ./env/.sample.env ./env/.env
```

If running with an **nginx** proxy, the **PROXY_HOST** and **PROXY_PORT** variables should point to the address and port of the backend *container*. In other words, if the application is being run locally in a container through `docker-compose up`, **PROXY_HOST** should be set equal to the name of the backend service in the `docker-compose.yml`. Otherwise, point these variables to wherever the backend is running. If running in standalone mode, these variables can be ignored.

**ROOT_DIR** and **NGINX_PORT** should not need changed from their defaults.

**Proxy Mode**

```shell
./scripts/docker/build-image --proxy
```

**Standalone Mode**

```shell
./scripts/docker/build-image
```

Once the image is build, it can be spun up directly through,

```shell
./scripts/docker/run-container
```

Or spun up with the rest of the application through the master `docker-compose.yml` file,

```shell
# from the innolab-master repository
docker-compose up
```

**NOTE**: If running through `docker-compose up`, ensure the image tag of the most recent build matches the image tag specified in the `docker-compose.yml`.

## HTML Editor

The **AdminComponent** uses the *@kolkov/angular-editor* for editing HTML content. Refer to [documentation](https://www.npmjs.com/package/@kolkov/angular-editor) for example usage.

## Generate Docs

From */frontend/* directory,

```shell
npx typedoc
```