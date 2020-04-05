FROM node:alpine

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8113

CMD node server.js
