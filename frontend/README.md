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

## Lazy Loading

The **Angular** application is broken into modules for [lazy-loading](https://angular.io/guide/lazy-loading-ngmodules). This minimizes the size of the compiled artifacts and creates a faster user experience, since the application will only load what is needed, when it is needed.

### AppModule

The main module, where application enters. This is the first module loaded; it is *always* loaded and *always* loaded first.

### CoreModule

The module behind the authentication wall. After the user logins in, this module is loaded. 

### NewsModule

The module for interacting with and rendering the results of the backend API. This module is only loaded if service calls to the backend need to be made.

### AdminModule

The module for administrative functions. This module is only loaded *if* the user is a **Developer** *and if* the user enters the administrative module of the application, through the `/admin` route.

### SharedModule

This module stores imports that are required across modules. This is where the modules from **Angular Core** and **Angular Material** are imported. Components, services, etc., that are used in all other modules can also be found here.

## ComponentConfig

The configuration *frontend/src/app/component/component.config.file* From *frontend/src/app/component/component.config.file* configures most aspects of the **Angular** application from one central location. In particular, the `routes` and `registry` attributes can be modified to display new routes along the navigation menu and add icons to the **Angular Material** icon registry, respectively. For example,

```javascript
export const componentConfig: Config = {
    dialogWidth: '50%',  dialogHeight: '25%',
    registerMsg: "xxx",
    editMsg: "xxx", editAlert: "xxx",
    createMsg: "xxxx", createAlert: "xxx",
    defaultMsg: "xxx",
    signOutMsg: 'xxx',
    routes: [
        { route: '', title: 'Home', tooltip: "Home Page" },
        { route: 'news', title: 'News Feed', tooltip: "Latest News From The Feed" },
    ],
    registry:[
        { icon: 'facebook', location: '../assets/icons/logo-facebook.svg'},
    ]
}
```

This configuration will add to the navigation menu a route button with text "Home" and a tooltip of "Home Page", along a route button to `/news` with text "News Feed" and tooltip "Latest News From The Feed". In addition, assuming there is a `logo-facebook.svg` in the */frontend/src/assets/icons/* directory, the configuration will also add a **MatIcon** for a facebook, accessible as,

```html
<mat-icon svgIcon="facebook"><mat-icon>
```

This icon is added during the **Angular** application initialization in */frontend/src/app/app.module.ts*.

**NOTE**: the icon file path is relative to the */frontend/src/app/* directory, since the **MatIconRegistry** is modified in the **AppComponent** initialization, when the **Angular** application bootstraps on the client browser for the first time.

## HTML Editor

The **AdminComponent** uses the *@kolkov/angular-editor* for editing HTML content. Refer to [documentation](https://www.npmjs.com/package/@kolkov/angular-editor) for example usage.

## Generate Docs

Docstrings appends to the classes and methods will get auto-generated into HTML using [Typedoc](https://typedoc.org/). From the */frontend/* directory, 

```shell
npx typedoc
```

See [comment documentation](https://typedoc.org/guides/doccomments/) for a reference on documenting new **Typescript** code.

## Dependencies

- [Angular Material](https://material.angular.io/)
- [@kolkov/angular-editor](https://www.npmjs.com/package/@kolkov/angular-editor)
- [ngx-pagination](https://www.npmjs.com/package/ngx-pagination)
- [ngx-webstorage](https://www.npmjs.com/package/ngx-webstorage)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [Typedoc](https://typedoc.org/)