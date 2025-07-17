
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npm uninstall tailwindcss postcss autoprefixer && \
    npm install tailwindcss@2.2.19 postcss@7.0.39 autoprefixer@9.8.8

COPY . .

RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
