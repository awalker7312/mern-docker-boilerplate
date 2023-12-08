
# mern-docker-boilerplate

A developer-friendly dockerized MERN stack boilerplate.


## Tech Stack
**Project:** Docker

**Client:** React, Vite, Bootstrap, Nginx(prod)

**Server:** Node, Express, MongoDB

## Environment Variables

If it's your first time running this in either dev or prod, please make sure to rename the env file forthe front end.

```bash
  mv frontend/.example.env frontend/.env
```

## Development

To build the docker container for development that supports hot reloading for both the backend and front end run the following in the root directory of the project.

```bash
  docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev up --build
```

The development frontend can be accessed at: <http://localhost:8080/>

## Production

To build the docker container for production run the following in the root directory of the project.

```bash
  docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev up --build
```

The production frontend can be accessed at: <http://localhost/>


## Authors

- [@awalker7312](https://www.github.com/awalker7312) - Alan Walker

