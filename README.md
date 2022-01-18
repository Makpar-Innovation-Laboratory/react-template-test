# react template

## Introduction

This is a template for a **React** application. There are two ways to deploy it.

1. Into a *nginx* container.

A *Dockerfile* in the project root builds the application inside of a **NodeJs** image and then copies the artifacts into a **nginx** container. 

2. Into an S3 bucket.

There is also a pipeline template in the */devop/* folder for a **BitBucket** pipeline that is preconfigured to deploy the **React** app to an S3 bucket configured to statically serve a website. The pipeline *yml* needs copied into the root of the project and the pipeline initialized through **BitBucket**'s UI. See [Pipeline](#pipeline) and [/devops/bitbucket-pipelines.yml](/devops/bitbucket-pipelines.yml) for more information about the CI/CD pipeline.

## Quickstart

### local

Setup the application on your local computer,

```
cd frontend
npm install
npm start
```

### production

```
cd frontend
npm install
npm run build
```

## Application Image

The app can be containerized through a multi-stage **Docker** image. It is first built on top of a **nodeJS** image and the artifacts copied over into an **nginx** image. To build the application image, you will need [Docker]() installed. Once that is done, you can build the image from project root directory with the following command,

`docker build --tag template-react:latest .`

After the build, you will see the image in your local repository,

`docker images`

You can spin up a container from this image with the following command,

`docker run --publish <local-port>:<container-port> template-react:latest`

Note, the default port for nginx is *80*, so the following command will map the local port *8000* to the container port,

`docker run --publish 80:8000 template-react:latest`

---
**Note**: The multi-stage Docker build ensures we have the bare minimum in the actual image. Note after you run the `docker build` command, there are two images in your local image repository, 

> `template-react   latest    eb47e873aa4b   4 minutes ago   134MB`      
> `<none>     <none>    7ceefa83d499   4 minutes ago   1.19GB`

The second image is the **nodeJS** image where the application artifacts were built. Notice how much larger it is in comparison to the other image; this is due to all of the dependencies that needed to be installed in the environment before the application could actually be built (i.e. everything in */pricing-tool-frontend/package.json*). The other image is the **nginx** image that has had the **React** webpacks copied over into one of its data directories. No dependencies have to be installed in the **nginx** image. This has security implications; namely, there is less surface area (in terms of libraries and dependencies that might have vulnerabilities in their codebase) exposed to a potential attack.
