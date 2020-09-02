FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY ./src ./src
ARG PORT=3000
EXPOSE $PORT
ENTRYPOINT [ "yarn", "start" ]
