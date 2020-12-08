FROM node:12.20-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --silent

COPY . .

ARG REACT_APP_API=http://localhost:8080
RUN REACT_APP_API=$REACT_APP_API npm run build

FROM nginx:1.19.5-alpine
COPY --from=node /usr/src/app/build /usr/share/nginx/html
COPY nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
