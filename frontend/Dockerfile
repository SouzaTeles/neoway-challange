FROM node:24-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]