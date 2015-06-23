var browserify = require('browserify')
var http = require('http')
var send = require('send')
var fs = require('fs')
var chromeLaunch = require('chrome-launch')

var browserifyOpts = {
	basedir: __dirname,
	debug: true
}
var chromeLaunchOpts = {
	args: [ '--always-enable-dev-tools' ]
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

var psRelay = chromeLaunch('http://localhost:1000/relay.html', chromeLaunchOpts)
var psTest = chromeLaunch('http://localhost:1000/test.html', chromeLaunchOpts)

process.once('SIGINT', function () { // ctrl+c
	console.log('killing')
	psRelay.kill()
	psRelay.once('exit', function () {
		psTest.kill()
		psTest.once('exit', function () {
			process.exit()
		})
	})
	process.once('SIGINT', function () {
		process.exit()
	})
})
