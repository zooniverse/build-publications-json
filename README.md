# Build `publications.json`

Pull down publication data from Contentful, build a `publications.json` file for Panoptes Front End, and upload it to S3.

# Running

### Running locally

```
npm install
npm start
```

See the [Configuration](#Configuration) section below on how to setup a `.env` file.

### Running with Docker

1. Build the Docker image:

    ```sh
    docker build -t zooniverse/build-publications-json .
    ```

1. Run it, including all the required environment variables:

    ```sh
    docker run --env AWS_ACCESS_KEY=... --env AWS_SECRET_ACCESS_KEY=...  zooniverse/build-publications-json
    ```

    Alternatively, if you want to use a `.env` file to configure the container:

    ```sh
    docker run --env-file .env zooniverse/build-publications-json
    ```

    See the [Configuration](#Configuration) section below on how to setup a `.env` file.

### Running with `docker-compose`

1. Create a `docker-compose.yml` and fill in your environment variables:

    ```
    version: "3"
    services:
      node:
        build: .
        environment:
          - AWS_ACCESS_KEY=
          - AWS_SECRET_ACCESS_KEY=
          - S3_BUCKET=
          - S3_REGION=
          - CONTENTFUL_SPACE=
          - CONTENTFUL_ACCESS_TOKEN=

    ```

1. Run `docker-compose build`
1. Run `docker-compose up`

## Configuration

The app is configured using the following environment variables:

- `AWS_ACCESS_KEY` **(required)**
- `AWS_SECRET_ACCESS_KEY` **(required)**
- `CONTENTFUL_ACCESS_TOKEN` **(required)**
- `CONTENTFUL_SPACE` **(required)**
- `S3_BUCKET` - defaults to `zooniverse-static`
- `S3_KEY` - defaults to `publications/publications.json`
- `S3_REGION` - defaults to `us-east-1`

These can be saved in a `.env` file in the project root:

```
# .env for modified config
AWS_ACCESS_KEY=aws-access-key
AWS_SECRET_ACCESS_KEY=aws-secret-access-key
CONTENTFUL_ACCESS_TOKEN=contentful-access-token
CONTENTFUL_SPACE=contentful-space-token
S3_BUCKET=zoo-publications
S3_KEY=pubs/pubs-list.json
S3_REGION=eu-west-1
```

Note that any environment variables defined in your environment will override those defined in `.env` when running locally.

**Remember not to commit your `.env` or `docker-compose.yml` files if you've added your access keys!**

## License

Copyright 2019 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
