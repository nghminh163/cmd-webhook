FROM node:lts
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN apt-get -qy update && apt-get install -qy openssl
RUN yarn prisma:generate
RUN yarn prisma:push
RUN yarn build

CMD ["node", "dist/server.js"]
