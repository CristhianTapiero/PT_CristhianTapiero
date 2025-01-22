FROM node:18-alpine

RUN apk update && apk add --no-cache dumb-init

ENV DIR /frontend

WORKDIR $DIR

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR
COPY src $DIR/

RUN npm run build && npm prune --production

EXPOSE 3001

CMD ["dumb-init", "node", "dist/index.js"]
