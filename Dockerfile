FROM node

WORKDIR /app

COPY . /app

EXPOSE 80

ENTRYPOINT ["node", "server.js"]
