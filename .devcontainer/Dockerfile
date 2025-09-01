FROM node:20-bullseye-slim

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y bash \
    git \
    curl \
    wget \
    ca-certificates

WORKDIR /workspaces/dc-universe