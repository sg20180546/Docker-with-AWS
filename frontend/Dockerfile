FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./
RUN chmod -R 777 /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 7000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html