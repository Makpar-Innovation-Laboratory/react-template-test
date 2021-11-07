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

## Pipeline

This repository can be easily hooked into a **BitBucket** pipeline on four environment branches, `Prod`, `Test`, `Staging` and `Dev`, using the *yml* file in the */devops/* directory. Copy that file into the project root and create the pipeline through the UI. It is recommended these branches are setup to require pull requests to be opened and approved before merges are allowed; In addition, the pipeline has been configured to run static code analysis on every branch, so it is also recommended merges require the condition of "atleast 1 successful build" in the branch permissions section of the Repository settings; this will enforce new code to meet standards before it is merged. 

When new changes are merged into these branches, the pipeline will kick off. The pipeline will spin up a **Node** container and build the application on BitBucket's cloud servers. The *devops/bitbuckets-pipelines.yml* contains all the configuration to build a **React** app and deploy to an **S3** bucket, however you will still need to do a little bit of setup on the AWS side.

You will need to set up a dummy user on AWS with access to the S3 bucket. The necessary policy permissions are included in *devops/aws/policies/pipelines.json*. The user credentials and bucket name will need added to the **BitBucket** deployment environment; the deployment environment is a set of variables that get injected into the pipeline while the application is building on **BitBucket**'s cloud servers.

See comments inside of *bitbucket-pipelines.yml* for more detailed information and a step-by-step process on setting up the pipeline.


---
**Potential Gotcha**: The pipeline caches */frontend/node_modules* so it doesn't have to re-install the frontend dependencies everytime the pipeline runs. If you happen to install a new dependency, the next time you run your code through the pipeline, you will need to clear the cache. **TODO**: could potentially check the checksum of *package.json* and use [bitbucket's clear cache script](https://bitbucket.org/atlassian/bitbucket-clear-cache/src/master/) to scrub the pipeline cache anytime it detects a new dependency.

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

## Documentation
- [BitBucket Pipelines](https://docs.launchdarkly.com/integrations/bitbucket-pipelines?utm_source=google&utm_medium=cpc&obility_id=126914704714&utm_campaign=&utm_term=&utm_content=529046860681&_bm=b&_bn=g&gclid=Cj0KCQjwwNWKBhDAARIsAJ8HkheO3YpyjRBKc4TSNovlTNxCZWwC32kWPv17SOG7zGceZenBf-Vb0-0aAvAbEALw_wcB)
- [Docker](https://docs.docker.com/)
- [nginx](https://www.nginx.com/resources/wiki/?_bt=541137080527&_bk=&_bm=b&_bn=g&_bg=125748574545&gclid=Cj0KCQjwwNWKBhDAARIsAJ8Hkhdv_mAcxYhY0igOUv0zG5yhXtD0VsffwNY1Cj0uu9mrSSaeeq5y3JcaAip4EALw_wcB)
- [React](https://reactjs.org/docs/getting-started.html)
