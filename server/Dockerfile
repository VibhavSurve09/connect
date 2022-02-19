From node:17-alpine
ENV PORT:3001
WORKDIR /usr/src/connect_socket
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node","index.js"]