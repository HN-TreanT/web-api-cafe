FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM node:18-alpine 


WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 8080

# CMD npm run start:prod

# RUN npm install --only=prod

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/main.js"]
