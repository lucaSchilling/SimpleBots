FROM node:8-alpine
WORKDIR /usr/src/app
COPY package-json /usr/src/app
RUN npm install
# adds all static files which were pre built
COPY dist /usr/src/app/dist
COPY server.js /usr/src/app
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "server.js" ]
