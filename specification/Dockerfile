FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:yml

EXPOSE 5055
EXPOSE 5065

CMD ["yarn", "start:dev"]