# Innovation Lab Frontend

Refer to the [official frontend documentation](https://innolab-coverage.makpar-innovation.net/frontend/index.html) for instructions on getting set up. Documentation for the entire [Innovation Lab application cluster can be found here](https://innolab-coverage.makpar-innovation.net).

## Start Local Server

```
cd frontend
npm run start
```

## Build

```
cd frontend
npm run build
```

## Unit Tests

```
cd frontend
npm run test:cover
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
