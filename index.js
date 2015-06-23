var EventEmitter = require('events').EventEmitter

module.exports = function TabEmitter(key) {
	key = 'tabemitter' + (key || '')
	var emitter = new EventEmitter()
	var originalEmit = emitter.emit

	emitter.emit = function emit() {
		var args = [].slice.call(arguments)
		localStorage.setItem(key, JSON.stringify(args))
		localStorage.removeItem(key)
		return originalEmit.apply(emitter, args)
	}

	window.addEventListener('storage', function (ev) {
		if (ev.key === key && ev.newValue) {
			var args = JSON.parse(ev.newValue)
			originalEmit.apply(emitter, args)
		}
	})

	return emitter
}
