FROM node:10

WORKDIR /usr/src

COPY package*.json ./
RUN npm install
COPY . .

RUN mkdir output
VOLUME /usr/src/output

CMD [ "npm", "start" ]
