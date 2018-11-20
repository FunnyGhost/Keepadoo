###### Stage 1
FROM node:latest as node
LABEL author="Catalin Ciubotaru"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build-prod

###### Stage 2
FROM nginx:alpine
VOLUME [ "/var/cache/nginx" ]
COPY --from=node /app/dist/keepadoo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

## docker build -t keepadoo -f nginx.prod.dockerfile .
## docker run -d -p 8080:80 keepadoo