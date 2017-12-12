FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV id 1
ENV username 'luca'