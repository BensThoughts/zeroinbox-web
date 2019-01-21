# Stage 1
FROM node:8.11.2-alpine as node-2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build_prod

# Stage 2
FROM nginx:1.13.12-alpine
COPY --from=node-2 /usr/src/app/dist/gmail-starter /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
