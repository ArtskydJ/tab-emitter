var tabEmitter = require('../index.js')
var emitter = tabEmitter('relay')

emitter.on('throw', function () {
	var args = [].slice.call(arguments)
	emitter.emit.apply(emitter, ['catch'].concat(args))
})
