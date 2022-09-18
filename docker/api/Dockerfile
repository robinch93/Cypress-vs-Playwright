FROM node:current-alpine3.16 as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./api /
CMD ["node", "api:prod:server"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY ./api /
CMD ["nodemon", "api:dev:server"]