var tabEmitter = require('../index.js')
var emitter = tabEmitter('relay')
var domready = require('domready')

domready(function () {
	window.addEventListener('storage', function (ev) {
		console.log('onstorage', ev)
	})

	emitter.on('throw', function () {
		var args = [].slice.call(arguments)
		emitter.emit.apply(emitter, ['catch'].concat(args))
	})
})

setTimeout(window.close, 10000)
