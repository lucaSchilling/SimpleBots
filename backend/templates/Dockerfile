FROM node:alpine
WORKDIR /app
# copies package-json for the npm install
COPY package.json /app
# installs every needed dependency
RUN npm install
COPY . /app
# id of the user will be needed for the botStart
ENV id 1
# username of the user will be needed for the database connection in botStart
ENV username 'noUser'