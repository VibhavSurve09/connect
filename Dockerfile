FROM node:17-alpine
WORKDIR /home/connect
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]