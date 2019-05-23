FROM node:10-alpine

# Timezone
RUN apk add --no-cache tzdata
ENV TZ Europe/Paris

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# build
RUN npm run build

EXPOSE 3000

CMD [ "node", "server" ]