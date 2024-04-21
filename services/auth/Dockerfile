FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# RUN yarn migrate:dev
RUN npx prisma generate

EXPOSE 5008

CMD ["yarn", "dev"]