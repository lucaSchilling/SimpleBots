FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
COPY ../db.js /app
ENV id 1