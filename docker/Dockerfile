FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist /app/dist ./

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off" ]