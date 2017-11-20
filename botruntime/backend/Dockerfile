FROM node:9.2.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node runtime.js
EXPOSE 3000