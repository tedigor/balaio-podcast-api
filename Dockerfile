FROM node:12.16-alpine
WORKDIR /usr/src/app
COPY . .
ENV MONGO_URL=mongodb://mongodb:27017/balaio
ENV PORT=3000
ENV SECRET = "SUELDO"
RUN yarn install
EXPOSE $PORT
ENTRYPOINT [ "yarn", "start" ]