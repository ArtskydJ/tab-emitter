var EventEmitter = require('events').EventEmitter

module.exports = function TabEmitter(key) {
	key = key || 'tab-emitter'
	var emitter = new EventEmitter()
	var originalEmit = emitter.emit

	emitter.emit = function emit(eventName) {
		var args = [].slice.call(arguments)
		var result = originalEmit.apply(emitter, args)

		localStorage.setItem(key, JSON.stringify(args))
		localStorage.removeItem(key)

		return result
	}

	window.addEventListener('storage', function (ev) {
		if (ev.key === key && ev.newValue) {
			var args = JSON.parse(ev.newValue)
			originalEmit.apply(emitter, args)
		}
	})

	return emitter
}
