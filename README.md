# DC Universe

Welcome to the DC Universe project\! This repository contains a full-stack application with a user interface built using **Angular** and a backend API built with **Nest.js**. Both services are configured to run within Docker containers for easy setup and deployment.

## Project Structure

* `.devcontainer`: Development configuration for Visual Studio Code.
* `./packages/dc-universe-main-fe`: The Angular application for the user interface.
* `./packages/dc-universe-main-api`: The Node.js/Express backend API.
* `./docker`: Postgres data base Docker configuration
* `docker-compose.yml`: A Docker Compose file to orchestrate and run both the frontend and backend containers together.

## Getting Started with Docker

To run this entire project, you'll need to have **Docker** and **Docker Compose** installed on your system.

### Prerequisites

* **Docker Desktop**: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

### Steps to Run

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Batega21/dc-universe.git
    cd dc-universe
    ```

2. **Build and run the containers**:
    From the root directory of the project, execute the following command:

    ```bash
    docker-compose up --build
    ```

    This command will:

      * Build the Docker images for both the frontend and backend services.
      * Create and start the containers.
      * Mount the local source code into the containers, allowing for **live-reloading** during development.

### Accessing the Applications

Once the containers are up and running, you can access the applications at the following URLs:

* **Main Frontend**: [http://localhost:4200](https://www.google.com/search?q=http://localhost:4200)
* **Main Backend API**: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

**Note**: The first build might take a few minutes as Docker downloads the necessary base images and installs the project dependencies. Subsequent builds will be much faster.

### Stopping the Containers

To stop the running containers, press `Ctrl + C` in the terminal. To stop and remove the containers, use:

```bash
docker-compose down
```

### Development

The `docker-compose.yml` file is configured to allow for a smooth development workflow. Any changes you make to the source code in the `/frontend` or `/backend` directories on your local machine will automatically be reflected in the running containers thanks to **volume mounting**. This means you don't need to manually rebuild the images after every code change.
