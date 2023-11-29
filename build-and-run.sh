#!/bin/sh

# Build the Docker image
docker build -t kts-frontend .

# Run the Docker container
docker run -p 3000:3000 kts-frontend