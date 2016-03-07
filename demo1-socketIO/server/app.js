var koa = require('koa')
var send = require('koa-send')
var app = koa()
var server = require('http').createServer(app.callback())
var io = require('socket.io')(server);
var static = require('koa-static-cache')
var path =require('path')


app.use(static(path.resolve(__dirname, '..', 'client'), {
  maxage: 60 * 60 * 24 * 365,
  dynamic: true,
  gzip: true
}))

var Router = require('koa-router')
var router = new Router()

router.get('/', function*(next) {
  yield send(this, 'index.html')
})

app.use(router.routes())

io.on('connection', function(socket) {
  socket.on('sendText', function(data) {
    socket.emit('receiveText', {
      content: data.content + '1'
    })
    socket.broadcast.emit('receiveText', {
      content: data.content + '1'
    })
  })
})


server.listen(3030)
