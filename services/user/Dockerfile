FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 5001

CMD ["yarn", "dev"]