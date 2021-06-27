FROM node:14-alpine

WORKDIR /usr/src/app 

COPY . .

RUN npm install global yarn 

CMD yarn start