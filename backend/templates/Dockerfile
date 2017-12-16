FROM node:alpine
WORKDIR /app
# Copies package-json for the npm install.
COPY package.json /app
# Installs every needed dependency.
RUN npm install
COPY . /app
# id of the user will be needed for the botStart.
ENV id 1
# username of the user will be needed for the database connection in botStart.
ENV username 'noUser'