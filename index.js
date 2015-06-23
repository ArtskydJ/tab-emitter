var EventEmitter = require('events').EventEmitter

module.exports = function TabEmitter(key) {
	var emitter = new EventEmitter()
	var originalEmit = emitter.emit

	key = key || 'tab-emitter'

	window.addEventListener('storage', function (ev) {
		//console.log('window.onstorage' + ev.key + ': ' + ev.newValue + ' (' + typeof ev.newValue + ')')
		if (ev.key === key && ev.newValue) {
			//console.log('emitting')
			var args = JSON.parse(ev.newValue)
			originalEmit.apply(emitter, args)
		}
	})

	emitter.emit = function emit(eventName) {
		var args = [].slice.call(arguments)
		localStorage.setItem(key, JSON.stringify(args))
		localStorage.removeItem(key)
		//console.log('self emitting')
		return originalEmit.apply(emitter, args)
	}

	//emitter.on('hey', console.log.bind(console))

	return emitter
}
