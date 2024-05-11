FROM node:18

WORKDIR /app/node/

COPY package*.json /app/node/

RUN npm install

COPY . /app/node/

ENV SERVER_PORT 8000
ENV FILER_PORT 5000
ENV FILTER_DOMAIN "127.0.0.1"

EXPOSE 8000

CMD ["npm", "start"]