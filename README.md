# Innovation Lab Frontend

Refer to the [official frontend documentation](https://innolab-coverage.makpar-innovation.net/frontend/index.html) for instructions on getting set up. Documentation for the entire [Innovation Lab application cluster can be found here](https://innolab-coverage.makpar-innovation.net).

## Start Local Server

```
cd frontend
ng serve
```

## Build

```
cd frontend
ng build --output-hashing none
```

## Docs

```
cd frontend
npm run docs
```

## Unit Tests

```
cd frontend
npm run test
```

## Docker Image
### Standalone
```
./scripts/docker/build-image
./scripts/docker/run-container
```

### Proxy
```
./scripts/docker/build-image --proxy
cd ../innolab-master
docker-compose up
```