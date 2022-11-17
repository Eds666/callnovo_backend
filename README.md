<p align="center" >
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Callnovo Back-end

## Instalación

1.      Clonar el proyecto

2.  ## Ejecutar
    ```bash
    $ npm install
    ```
3.  ```bash
    Clonar el archivo ".env.template" y renombrar a ".env"
    ```
4.  ```bash
    Cambiar las variables de entorno
    ```
5.  ## Levantar la base de datos
    ```bash
    puede ser en postgres local
    ó
    docker-compose up -d
    ```
6.  ## Running the app
    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```
7.  ## Ejecutar el SEED
    ```bash
    http://localhost:3000/api/v1/seed
    ```
8.  ## Test

    ```bash
    # unit tests
    $ npm run test

    # e2e tests
    $ npm run test:e2e

    # test coverage
    $ npm run test:cov
    ```