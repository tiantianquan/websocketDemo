var koa = require('koa')
var send = require('koa-send')
var app = koa()
var server = require('http').createServer(app.callback())
var io = require('socket.io')(server);


app.use(require('koa-static')('../client'))

var Router = require('koa-router')
var router = new Router()

router.get('/',function*(next){
  yield send(this,'../client/index.html')
})

app.use(router.routes())

io.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  })
  socket.on('my other event', function(data) {
    console.log(data)
  })
})

app.listen(3000)

server.listen(3001)
