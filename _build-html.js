var fs = require('fs')
var path = require('path')

var htmlPath = path.join(__dirname,  'index.html')
var jsPath = path.join(__dirname, '_src.js')

var code = fs.readFileSync(jsPath, 'utf-8').replace(/\t/g, '    ')
var html = fs.readFileSync(htmlPath, 'utf-8')
	.replace(/<pre><code>[\s\S]*<\/code><\/pre>/, '<pre><code>' + code + '</code></pre>')

fs.writeFileSync(htmlPath, html)
