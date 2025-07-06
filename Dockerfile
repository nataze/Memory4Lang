FROM node:18 AS build

WORKDIR /app

# Copy project files
COPY package*.json ./
COPY tsconfig*.json ./
COPY public ./public
COPY src ./src
COPY tsconfig.json ./


RUN npm install
RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
