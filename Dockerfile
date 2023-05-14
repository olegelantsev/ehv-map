FROM node:14.17.1-alpine3.13

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install newrelic

COPY . .

EXPOSE 3000

CMD ["node", "-r", "newrelic", "index.js"]