FROM node:alpine
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install express
RUN npm install ejs
ENV PORT=8082
EXPOSE 8082
CMD [ "npm", "start" ]
