# dev
FROM node:14

WORKDIR /var/www/tracker-be

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
