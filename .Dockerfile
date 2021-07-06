
FROM node:16
# 在容器中创建一个目录
RUN mkdir -p /socket-server

COPY . /socket-server

# 定位到容器的工作目录
WORKDIR /socket-server

RUN npm install
 
EXPOSE 9348

CMD ["npm","run","server"]
