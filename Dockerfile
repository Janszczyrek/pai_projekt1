FROM node:20-bullseye-slim

# Install SQLite3 and its dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 80

CMD [ "npm", "start" ]