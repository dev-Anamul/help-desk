FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate

EXPOSE 5002

CMD ["yarn", "dev"]