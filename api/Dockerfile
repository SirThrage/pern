FROM node:12.20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --quiet

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
