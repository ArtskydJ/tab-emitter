var fs = require('fs')

var str = fs.readFileSync(__dirname + '/color-watcher.js', { encoding: 'utf-8' })
	.replace(/\r?\n/g, '<br>\n')
	.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')

document.getElementById('code-box').innerHTML = str
