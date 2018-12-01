###### Stage 1
FROM node:10 as node
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
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

## docker build -t keepadoo -f nginx.prod.dockerfile .
## docker run -d -p 8080:80 keepadoo