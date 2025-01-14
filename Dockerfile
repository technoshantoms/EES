FROM node:18-bullseye

RUN apt-get update && apt-get install --assume-yes --no-install-recommends supervisor
COPY docker/node/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /var/ees

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
COPY src/assets/SanctionedAddresses /var/ees/dist/src/assets/SanctionedAddresses

#RUN ["chmod", "+x", "docker/node/entrypoint.sh"]
#ENTRYPOINT ["docker/node/entrypoint.sh"]

CMD ["/usr/bin/supervisord"]
