FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]