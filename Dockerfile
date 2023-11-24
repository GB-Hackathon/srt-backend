FROM node:alpine

COPY . /app
WORKDIR /app

RUN npm i -g yarn --force
RUN yarn

RUN yarn build

CMD yarn start:prod