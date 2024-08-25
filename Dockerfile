FROM node:18 AS build

LABEL authors="alexa"

WORKDIR /react-front

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /react-front/build /usr/share/nginx/html