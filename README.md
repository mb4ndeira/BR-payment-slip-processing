# BR-payment-slip-processing

This service is an brazillian payment slip processing API (based on the FEBRABAN regulamentation) that contains validation and data retrieving features. Built on top of [Node.js](https://nodejs.org/en/) using [NestJs](https://nestjs.com/).

**Resources:**

- Consuming documentation (['/docs'](https://mbandeira-br-payment-slip-processing-production.up.railway.app/docs/))
- Deploy [endpoint](https://mbandeira-br-payment-slip-processing-production.up.railway.app) (Migrated from [AWS](https://aws.amazon.com/) to [Railway](https://railway.app/) due to billing policies)
- Insomnia [collection](/assets/Insomnia_collection.json)
- Regulatory documentation: [Boletos de cobrança](https://storage.googleapis.com/slite-api-files-production/files/b8def5e9-f732-4749-88ea-25270cb71c4d/Titulo.pdf); [Guias de Arrecadação](https://storage.googleapis.com/slite-api-files-production/files/222c4ec7-9056-4149-aa42-e66b135f523a/Convenio.pdf)



## Running Locally

This project is currently disponible at two sources, and it can be downloaded with one of the following methods:

- Pulling image from Docker Hub [repository](https://hub.docker.com/repository/docker/mbandeira/br-payment-slip-processing) (recommended)

- Cloning github [repository](https://github.com/mb4ndeira/BR-payment-slip-processing)

### Running with Docker image 

You can download and run a container from the latest image of the project Docker Hub repository. To start make sure you have these installed:

**Prerequisites**

- [Docker](https://www.docker.com/get-started/)

#### 1. Pulling Docker image

```bash
  docker pull mbandeira/br-payment-slip-processing
```

#### 2. Running container from image

Run the image with the 'p' flag to allow port forwarding of the container's '8080' port (project default) to the host's choosen one.

```bash
  docker run -p $host_port:8080 mbandeira/br-payment-slip-processing
```

**For development**

 The 'v' flag creates a container volume synchronized with the repository, enabling hot reloading use.

```bash
  docker run -p $host_port:8080 -v $PWD:/usr/src/app mbandeira/br-payment-slip-processing
```

### Running from GitHub repository 

The service can also be downloaded as git repository to be managed and ran with a package manager (I used Yarn, but... Doesn't really matter, does it?):

**Prerequisites**

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/) (Interchangeable)

#### 1. Cloning the repository

```bash
  git clone git@github.com:mbandeira/br-payment-slip-processing.git
```

or download it with [degit](https://github.com/Rich-Harris/degit) (if you don't want it with the git folder).

```bash
  npx degit git@github.com:mbandeira/br-payment-slip-processing.git
```

#### 2. Installing dependencies

Run the installing line of your dependency manager inside the downloaded folder. 

```bash
yarn
```

#### 3. Running it with a script

Run the service with one of the disponible scripts.

**Start scripts**

- Default: `start`
- Watch mode on: `start:dev` 
- Debug mode on`start:debug`
- Production script: `start:prod`

```bash 
yarn $choosen_start_script
```

## License

This repository is under a MIT license. For more details, check the [license](LICENSE.md) file.

