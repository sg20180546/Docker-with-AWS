FROM node:10

# RUN command
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["node","server.js"]