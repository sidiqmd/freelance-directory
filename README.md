# Demo Project(Freelance Directory)

## Description

With single command able to deploy this project to any server.
This demo project breaks down into three parts:

* proxy - this serve as reverse proxy.
* service - this is where all the APIs are implemented.
* web - this is where all the UI is implemented.

>***Note**: Check out live demo [here](http://139.59.252.110).*

## Technology used

* Docker
* NodeJS
* Angular
* MariaDB
* Nginx

## Requirement

* Docker

## Running the app

1. Install Docker & Docker Compose

1. Clone this repository

1. Execute below command

    ```bash
    cd /freekance-directory

    docker-compose up -d
    ```

1. Access the [project](http://localhost) at <http://localhost>.

1. To shut down

    ```bash
    docker-compose down
    ```

## License

[MIT licensed](LICENSE).

This is demo project and not meant to be used for `production`.
