#  this will make an image docker for the server side an will run it

FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY . /app
RUN yarn install

CMD ["yarn","start"]