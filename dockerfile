
# Dockerfile

# base image
FROM node:16-alpine AS builder

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn install

# start app
RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD yarn start
