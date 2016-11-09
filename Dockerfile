FROM mhart/alpine-node:7.1.0
MAINTAINER Harsh Singh hsingh23@illinois.edu
WORKDIR /franken-server
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*
COPY package.json /franken-server
RUN npm i
COPY . /franken-server
EXPOSE 3337
CMD npm run start
