FROM node:20.11.1-alpine3.19 

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5001

CMD ["yarn", "dev"]