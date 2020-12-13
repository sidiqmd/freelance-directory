# ################## Build Environment ##################
FROM node:13-alpine as node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:prod


# Stage 2
FROM nginx:1.15-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8001