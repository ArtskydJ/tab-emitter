var browserify = require('browserify')
var fs = require('fs')
var spawn  = require('child_process').spawn
var browser = require('chrome-location') || require('firefox-location')
var path = require('path')
var url = require('url')
var results = require('tape-results')

var templatePath = path.resolve(__dirname, 'template.html')
var template = fs.readFileSync(templatePath, { encoding: 'utf-8' })

function makeHtml(name, cb) {
	var file = path.resolve(__dirname, name + '.js')
	var browserifyOpts = {
		basedir: __dirname,
		debug: true
	}
	browserify(file, browserifyOpts).bundle(function (err, buf) {
		if (err) cb(String(err), 500)
		else cb(template.replace('NAME', name).replace('CODE', buf.toString()))
	})
}

function send(res, content, code) {
	res.statusCode = code || 200
	res.end(content)
}

var server = results()
var port = server.address().port
server.on('request', onRequest)

function onRequest(req, res) {
	var parsed = url.parse(req.url, true)
	var filename = __dirname + parsed.pathname
	var ext = path.extname(filename)
	var base = path.basename(filename, ext)

	var src = fs.createReadStream(filename)
	src.pipe(res)
	src.on('error', handle)

	function handle(err) {
		if (ext === '.html') makeHtml(base, send.bind(null, res))
		else send(res, String(err), 404)
	}
}


var chromeWindow = spawn(browser, ['http://localhost:' + port + '/index.html'])
