var tabEmitter = require('../index.js')
var emitter = tabEmitter('relay')
document.body.innerHTML = '<h1>relay</h1>'

window.addEventListener('storage', function (ev) {
	console.log('onstorage', ev)
})

emitter.on('bounce', function () {
	var args = [].slice.call(arguments)
	console.log('RELAYING', args)
	args.unshift('rebounce')
	emitter.emit.apply(emitter, args)
})

//setTimeout(window.close, 10000)
