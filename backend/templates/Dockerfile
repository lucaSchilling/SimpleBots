FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV config {"_id": "1", "name": "Luca ist der Boss", "welcomeMessage": "Hallo I Bims Luca der Boss", "options": [{"message": "opt1", "redirect": ""}, {"message": "opt2", "redirect": ""}, {"message": "opt3", "redirect": ""}]}
CMD ["sh", "-c", "node bottest.js \"${welcomeMessage}\" ${_id} ${name} \"${config}\""]