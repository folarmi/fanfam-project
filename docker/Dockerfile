FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# ENV_FILE contents are mounted here at build time
RUN --mount=type=secret,id=envfile,dst=/app/.env npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist ./

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]