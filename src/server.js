const Koa = require('koa');
const app = new Koa();
const {
  get,
  set
} = require('./redis');
const server = require('http').createServer(app.callback());
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");
const { Server } = require("socket.io");
const io = new Server(server);

io.adapter(createAdapter());
setupWorker(io);

io.on('connection', (socket) => {
  console.log('用户连接上服务器')
  // 向新链接的页面通知当前模式
  get('mode').then(mode => {
    socket.emit('mode', {
      mode
    });
  })

  socket.on("mode", ({
    mode
  }) => {
    console.log(mode, '服务器接收到模式')
    set('mode', mode)
    get('mode')
      .then(m => {
        console.log('redis取到mode为', m)
        io.sockets.emit('mode', {
          mode: m
        });
      }).catch(err => {
        io.sockets.emit('mode', {
          mode: err
        });
      })
  })
  socket.on('disconnect', () => {
    console.log('用户断开连接')
  })
});

server.listen(9348, () => {
  console.log('socket server in 9348 port')
});