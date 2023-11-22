#!/bin/bash

if [ "$1" == "dev" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev up -d --build
elif [ "$1" == "prod" ]; then
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod up -d --build
elif [ "$1" == "start-dev" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev start
elif [ "$1" == "start-prod" ]; then
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod start
elif [ "$1" == "stop-dev" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev stop
elif [ "$1" == "stop-prod" ]; then
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod stop
elif [ "$1" == "stop-all" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev stop
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod stop
elif [ "$1" == "down-dev" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev down
elif [ "$1" == "down-prod" ]; then
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod down
elif [ "$1" == "down-all" ]; then
    docker-compose -f docker-compose.dev.yml -p mern_boilerplate_dev down
    docker-compose -f docker-compose.prod.yml -p mern_boilerplate_prod down
elif [ "$1" == "help" ]; then
    echo "Usage: ./run.sh [option]"
    echo "Options:"
    echo "  dev       - Build and start the development environment"
    echo "  prod      - Build and start the production environment"
    echo "  start-dev - Start the development environment"
    echo "  start-prod - Start the production environment"
    echo "  stop-dev  - Stop the development environment"
    echo "  stop-prod - Stop the production environment"
    echo "  stop-all  - Stop both the development and production environments"
    echo "  down-dev  - Stop and remove the development environment"
    echo "  down-prod - Stop and remove the production environment"
    echo "  down-all  - Stop and remove both the development and production environments"
else
    echo "Invalid argument. Use 'help' for help."
fi