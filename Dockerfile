FROM node:16

WORKDIR /usr/src/admin_app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]