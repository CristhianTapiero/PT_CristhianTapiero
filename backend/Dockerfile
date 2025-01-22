FROM node:18-alpine

RUN apk update && apk add --no-cache dumb-init

ENV DIR /backend

WORKDIR $DIR

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR
COPY nodemon.json $DIR
COPY src $DIR/src
COPY prisma $DIR/prisma

RUN npm run build && npm prune --production
RUN npx prisma generate

EXPOSE 3001

CMD ["dumb-init", "node", "dist/index.js"]
