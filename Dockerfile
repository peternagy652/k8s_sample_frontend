FROM node:18.1-alpine as build
WORKDIR /app
COPY . ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY ./certs/server.pem /opt/ssl/localhost.pem
COPY ./certs/server.key /opt/ssl/localhost.key
EXPOSE 80