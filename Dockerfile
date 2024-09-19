# Base image
FROM node:20.17-alpine3.20
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./


# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# ENV DATABASE_URL="mongodb+srv://cuonghm:vanha110100@cluster0.e74cvwr.mongodb.net/hoang-gia-hotel?retryWrites=true&w=majority"
# ENV PORT=3002
# ENV JWT_SECRET="~!tai-xiu-game"
# ENV MAIL_SERVICE_USER="chcodeweb@gmail.com"
# ENV MAIL_SERVICE_PASS="cfpkphiufoyfvaqk"
# ENV MAIL_SERVICE_TO_USER="Quanlythongtin1102@gmail.com"

EXPOSE 8080


# Start the server using the production build
CMD [ "node", "dist/main.js" ]
