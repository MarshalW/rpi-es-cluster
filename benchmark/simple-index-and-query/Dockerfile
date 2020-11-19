FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb
RUN dpkg -i dumb-init_*.deb

# CMD [ "node", "app.js" ]

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD [ "node", "app.js" ]