FROM node:16.13.1

RUN mkdir -p /apps/node-server

WORKDIR /apps/node-server

COPY ./src ./src

COPY ./package.json ./nest-cli.json ./tsconfig.build.json ./tsconfig.json ./

RUN npm install

RUN npm run prebuild && npm run build