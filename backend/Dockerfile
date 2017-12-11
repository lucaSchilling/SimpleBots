FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node runtime.js
EXPOSE 3001