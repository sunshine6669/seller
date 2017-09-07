/**
 *  测试服务
 */
var express = require('express')
var config = require('./config/index.js')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/', (req, res, next) => {
  req.url = '/index.html'
  next()
})

app.use(router)

var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRouters = express.Router()

apiRouters.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRouters.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRouters.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', apiRouters)
//将文件夹指向dist
app.use(express.static('./dist'))

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
