var TabEmitter = require('../index.js')
var emitter = TabEmitter('relay')

emitter.on('one', function (a) {
	emitter.emit('two', { num: a })
})
