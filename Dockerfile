FROM node:12.16.2-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --slient

COPY ./dist ./dist
COPY ./build ./build

EXPOSE 3000
CMD [ "npm", "start"]
