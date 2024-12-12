# BASE IMAGE
FROM node:20.17.0 

WORKDIR /app

COPY package.json* .

RUN npm install 

EXPOSE 3000

CMD ["node", "index.js"]
