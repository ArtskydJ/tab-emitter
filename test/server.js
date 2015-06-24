var browserify = require('browserify')
var http = require('http')
var fs = require('fs')
var spawn  = require('child_process').spawn
var chrome = require('chrome-location')
var path = require('path')

var browserifyOpts = {
	basedir: __dirname,
	debug: true
}

var template = fs.readFileSync(__dirname + '/template.html', { encoding: 'utf-8' })

var server = http.createServer(function (req, res) {
	var filename = __dirname + (req.url !== '/' ? req.url : '/index.html')
	var ext = path.extname(filename)
	var base = path.basename(filename, ext)

	var src = fs.createReadStream(filename)

	src.pipe(res)

	src.on('error', function (err) {
		if (ext === '.html') {
			//res.setHeader('content-type', 'text/html')
			res.end(template.replace(/TEMPLATE/g, base))
		} else if (ext === '.js') {
			src = fs.createReadStream(filename.replace('-bundle', ''))
			browserify(src, browserifyOpts).bundle().pipe(res)
		} else {
			console.log(err)
			res.end(String(err))
		}
	})
})

server.listen(1000)

var ps1 = spawn(chrome, ['http://localhost:1000/'])

//setTimeout(process.exit, 12000)
