# Build `publications.json`

Pull down publication data from Contentful, and build a `publications.json` file for Panoptes Front End.

The finished `publications.json` file gets saved to the `./output` directory.

# Running

### Running locally

```
npm install
npm start
```

See the [Configuration](#Configuration) section below on how to configure the script.

### Running with Docker

1. Build the Docker image:

    ```sh
    docker build -t zooniverse/build-publications-json .
    ```

1. Run it, including all the required environment variables:

    ```sh
    docker run --env CONTENTFUL_SPACE=... --env CONTENTFUL_ACCESS_TOKEN=...  zooniverse/build-publications-json
    ```

    Alternatively, if you want to use a `.env` file to configure the container:

    ```sh
    docker run --env-file .env zooniverse/build-publications-json
    ```

    See the [Configuration](#Configuration) section below on how to configure the script.

    The `Dockerfile` exposes a volume at `/usr/src/output`, where you can get the finished JSON file using `docker cp`:

    ```sh
    # $(docker ps --all -q | head -1) gets the container ID of the last run
    docker cp $(docker ps --all -q | head -1):/usr/src/output/publications.json ./
    ```

## Configuration

The app is configured using the following environment variables:

- `CONTENTFUL_ACCESS_TOKEN` **(required)**
- `CONTENTFUL_SPACE` **(required)**

These can be saved in a `.env` file in the project root:

```
# .env for modified config
CONTENTFUL_ACCESS_TOKEN=contentful-access-token
CONTENTFUL_SPACE=contentful-space-token
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
