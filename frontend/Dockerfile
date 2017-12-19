FROM node:alpine
WORKDIR /usr/src/app
# adds all static files which were pre built
COPY dist /usr/src/app/dist
COPY server.js /usr/src/app
# installing all needed dependencies
RUN npm install express && npm install ejs
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "server.js" ]
