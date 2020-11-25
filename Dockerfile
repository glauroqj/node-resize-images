FROM node:14.15.1

WORKDIR /app

RUN npm install --unsafe-perm -g full-icu@1.2.1 && \
    chmod +x /usr/local/bin/yarn

ENTRYPOINT yarn && yarn start-dev