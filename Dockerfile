FROM node:11-stretch-slim

COPY ./ /app
WORKDIR /app

RUN npm install
RUN npm run build

RUN npm install pm2@latest -g

EXPOSE 3000

CMD ["npm", "start"]
