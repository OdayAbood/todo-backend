FROM node:18

WORKDIR /TODO_APP/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]