FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV SERVER_PORT 3000

EXPOSE 3000

CMD ["node", "./server.js"]