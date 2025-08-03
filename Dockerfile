FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY src/docs/swagger.json dist/docs/swagger.json

RUN npm run build