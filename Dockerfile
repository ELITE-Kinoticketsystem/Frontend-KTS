# Node Base Image
FROM node:20.4.0-alpine3.17 AS build

RUN corepack enable

WORKDIR /app
COPY . .

# Install app dependencies
RUN pnpm install

RUN pnpm run build
RUN pnpm prune --prod

# Serve the app with a minimal node image
FROM node:20.4.0-alpine3.17 AS serve

WORKDIR /app
# Copy the app from the build stage
COPY --from=build app/package.json .
COPY --from=build app/node_modules ./node_modules
COPY --from=build app/build ./build

EXPOSE 3000
CMD ["node", "build"]