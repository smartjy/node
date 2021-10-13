FROM node:16.11.1-alpine

#ARG SERVER
WORKDIR /usr/src/app
COPY package.json ./
COPY . .

RUN npm install
EXPOSE 8080
CMD [ "node", "server.js"]