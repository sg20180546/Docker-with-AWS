FROM node:10

# RUN command
# WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD ["node","server.js"]