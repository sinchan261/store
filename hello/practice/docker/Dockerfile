FROM node:18
WORKDIR /app
COPY package*.json ./

# COPY main.js index.js
# COPY package.json package.json

COPY . .
COPY .env .env
RUN npm install
EXPOSE 4000
CMD [ "node","main.js" ]