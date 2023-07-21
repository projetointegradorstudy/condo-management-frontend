FROM node:18.16.0-alpine3.17 as build

WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build


FROM nginx:stable-alpine as production

COPY --from=build app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
