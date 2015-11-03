var http = require('http')
var launch = require('opener')
var ecstatic = require('ecstatic')

var serve = ecstatic({ root: __dirname + '/serve' })
var server = http.createServer(onRequest)

var port = 1024 + Math.floor(Math.random() * 8000)
server.listen(port)

function onRequest(req, res) {
	(/pass|fail/.test(req.url) ? quit : serve)(req, res)
}

function quit(req, res) {
	var passed = req.url.indexOf('/pass') >= 0
	res.end()
	server.close()
	console.log(passed ? 'passed' : 'failed')
	process.exit(passed ? 0 : 1)
}

launch('http://localhost:' + port + '/index.html')
