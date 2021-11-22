# InnoLab Frontend - React Application


## Package Table of Contents
- [App.js](/docs/react/App.js.html)
- [Components/Home.js](/docs/react/Components_Home_Home.js.html)
- [Components/Login.js](/docs/react/Components_Login_Login.js.html)
- [Components/Navigation.js](/docs/react/Components_Navigation_Navigation.js.html)
- [Utility/Auth.js](/docs/react/Utility_Auth.js.html)

## Sandbox Environment Urls
- Dev
    - Application: [https://innolab-dev.makpar-innovation.net](https://innolab-dev.makpar-innovation.net)
    - Coverage: [https://innolab-coverage-dev.makpar-innovation.net](https://innolab-coverage-dev.makpar-innovation.net)
    - SonarQube: [http://innolab-sonar.makpar-innovation.net](https://innolab-sonar.makpar-innovation.net)

This repository connects to the **Cloudfront** and **s3** components of the Innovation Lab sandbox environment. Currently, it is setup for a **React** application. An **AWS CodePipeline** CI/CD pipeline is configured to deploy the **React** app to an **S3** bucket which in turn is served through the **Cloudfront** distribution

See [Pipeline section](#pipeline) below and [/devops/bitbucket-pipelines.yml](/devops/bitbucket-pipelines.yml) for more information about the CI/CD pipeline.

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

## Pipeline

This repository is hooked into an **AWS CodePipeline** pipeline on three environment branches, `Prod`,  `Staging` and `Dev`, using the *buildspec.yml* file in the root directory. 

When new changes are merged into the environment branches, the pipeline will kick off. The pipeline will spin up a **Node** container and build the application within **CodeBuil**. The *buildspec.yml* contains all the configuration to build a **React** app and deploy to an **S3** bucket, however you will still need to do a little bit of setup on the AWS side.

---

## Application Image

The app can be containerized through a multi-stage **Docker** image. It is first built on top of a **nodeJS** image and the artifacts copied over into an **nginx** image. To build the application image, you will need [Docker]() installed. Once that is done, you can build the image from project root directory with the following command,

`docker build --tag dockerized-react:latest .`

After the build, you will see the image in your local repository,

`docker images`

You can spin up a container from this image with the following command,

`docker run --publish <local-port>:<container-port> dockerized-react:latest`

Note, the default port for nginx is *80*, so the following command will map the local port *8000* to the container port,

`docker run --publish 80:8000 dockerized-react:latest`

---
**Note**: The multi-stage Docker build ensures we have the bare minimum in the actual image. Note after you run the `docker build` command, there are two images in your local image repository, 

> `dockerized-react   latest    eb47e873aa4b   4 minutes ago   134MB`      
> `<none>     <none>    7ceefa83d499   4 minutes ago   1.19GB`

The second image is the **nodeJS** image where the application artifacts were built. Notice how much larger it is in comparison to the other image; this is due to all of the dependencies that needed to be installed in the environment before the application could actually be built (i.e. everything in */pricing-tool-frontend/package.json*). The other image is the **nginx** image that has had the **React** webpacks copied over into one of its data directories. No dependencies have to be installed in the **nginx** image. This has security implications; namely, there is less surface area (in terms of libraries and dependencies that might have vulnerabilities in their codebase) exposed to a potential attack.


## Deploying the Application

The **S3** bucket this repo is hooked into typically sits behind a **CloudFront** distribution. Any time a new deployment goes through, the **CF** cache will need invalidated before the changes appear. To invalidate the cache, copy the *.sample.env* environment file to a new *.env* file and add the ID of the **CloudFront** distribution to the **CLOUDFRONT_DISTRIBUTION_ID** environment file and then execute the script,

```
./scripts/invalidate-cache
```

---
