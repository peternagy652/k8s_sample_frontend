FROM node:18.1-alpine as build
WORKDIR /app
COPY . ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY ./certificates/localhost.crt /opt/ssl/localhost.crt
COPY ./certificates/localhost.unencrypted.key /opt/ssl/localhost.key

COPY ./certificates/ca.cert.pem /usr/local/share/ca-certificates/ca.cert.crt

RUN cat /usr/local/share/ca-certificates/ca.cert.crt >> /etc/ssl/certs/ca-certificates.crt
RUN apk --no-cache add ca-certificates && rm -rf /var/cache/apk/*
RUN update-ca-certificates

EXPOSE 443