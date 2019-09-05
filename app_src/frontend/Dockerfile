FROM node:latest

RUN mkdir -p /app_backend/public
RUN mkdir -p /app_backend/src
WORKDIR /app_backend

COPY public /app_backend/public
COPY src /app_backend/src

COPY server.js /app_backend
COPY package.json /app_backend

RUN npm install

ENTRYPOINT ["npm", "start"]