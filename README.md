# InnoLab Frontend

This repository connects to the **Cloudfront** and **s3** components of the Innovation Lab sandbox environment. Currently, it is setup for a **React** application. An **AWS CodePipeline** CI/CD pipeline is configured to deploy the **React** app to an **S3** bucket which in turn is served through the **Cloudfront** distribution

See [Pipeline section](#pipeline) below and [/devops/bitbucket-pipelines.yml](/devops/bitbucket-pipelines.yml) for more information about the CI/CD pipeline.

## Quickstart

### local

Setup the application on your local computer,

```shell
cd frontend
npm install
ng serve
```

This will open a development server on *localhost:4200*

### production

```shell
cd frontend
npm install
ng build --aot --output-hashing none
```

## Application Image
 
TODO

## Pipeline

This repository is hooked into an **AWS CodePipeline** pipeline on three environment branches, `Prod`,  `Staging` and `Dev`, using the *buildspec.yml* file in the root directory. 

When new changes are merged into the environment branches, the pipeline will kick off. The pipeline will spin up a **Node** container and build the application within **CodeBuild**. The *buildspec.yml* contains all the configuration to build a **React** app and deploy to an **S3** bucket, however you will still need to do a little bit of setup on the AWS side.



## Deploying the Application

The **S3** bucket this repo is hooked into typically sits behind a **CloudFront** distribution. Any time a new deployment goes through, the **CF** cache will need invalidated before the changes appear. To invalidate the cache, copy the *.sample.env* environment file to a new *.env* file and add the ID of the **CloudFront** distribution to the **CLOUDFRONT_DISTRIBUTION_ID** environment file and then execute the script,

```shell
./scripts/invalidate-cache
```

---
