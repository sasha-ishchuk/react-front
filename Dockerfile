FROM node:14 AS build
LABEL authors="alexa"

WORKDIR /react-front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /react-front/build /usr/share/nginx/html