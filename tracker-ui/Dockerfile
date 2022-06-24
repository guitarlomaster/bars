# dev
FROM node:14

WORKDIR /var/www/tracker-ui

COPY ./ ./

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
