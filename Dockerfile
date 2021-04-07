FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g

COPY . .

EXPOSE 3000

CMD ["npm","start"]