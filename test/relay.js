var tabEmitter = require('../index.js')
var emitter = tabEmitter('relay')
document.body.innerHTML = '<h1>relay</h1>'

emitter.on('bounce', function () {
	emitter.emit.apply(emitter, 'rebounce', [].slice.call(arguments))
})

setTimeout(window.close, 10000)
