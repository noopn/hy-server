
FROM node:16

RUN mkdir -p /socket-server

COPY . /socket-server

ENV HY_SERVER server

WORKDIR /socket-server

RUN npm install

 
EXPOSE 9348

CMD ["npm","run","prod-server"]
