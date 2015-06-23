var browserify = require('browserify')
var http = require('http')
var fs = require('fs')
var spawn  = require('child_process').spawn
var chrome = require('chrome-location')

var browserifyOpts = {
	basedir: __dirname,
	debug: true
}

var server = http.createServer(function (req, res) {
	var src = fs.createReadStream(__dirname + req.url)
	if (req.url.indexOf('.js') === req.url.length - 3) {
		browserify(src, browserifyOpts).bundle().pipe(res)
	} else {
		src.pipe(res)
	}

	src.on('error', function (err) {
		res.end(String(err))
	})
})

server.listen(1000)

var ps1 = spawn(chrome, ['http://localhost:1000/relay.html'])
var ps2 = spawn(chrome, ['http://localhost:1000/test.html'])

setTimeout(process.exit, 12000)
