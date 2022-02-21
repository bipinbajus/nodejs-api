FROM node:16

ENV PORT 3000
ENV HOST 0.0.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN yarn install

# Copying rest of the application to app directory
COPY . /usr/src/app

#RUN yarn build

# Expose the port and start the application
EXPOSE 3000

CMD ["yarn","start"]