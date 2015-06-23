var test = require('tape')
var after = require('after')
var TabEmitter = require('../index.js')
var domready = require('domready')

domready(function () {
	window.addEventListener('storage', function (ev) {
		console.log('onstorage', ev)
	})

	test('namespaces work', function (t) {
		t.plan(1)
		var emitter1 = TabEmitter('yes')
		var emitter2 = TabEmitter('no')

		emitter1.on('x', function (a) {
			t.equal(a, 13)
			setTimeout(t.end.bind(t), 100)
		})
		emitter2.on('x', t.fail.bind(t))

		emitter1.emit('x', 13)
	})

	test('relay works', function (t) {
		t.plan(8)
		var emitter = TabEmitter('relay')
		var end = after(2, function () {
			t.end()
		})

		function assert(name) {
			return function (a, b, c, d) {
				console.log('assert', arguments)
				t.equal(a, 13, name)
				t.deepEqual(b, { num: 13 }, name)
				t.equal(c, undefined, name)
				t.equal(d, undefined, name)
				end()
			}
		}

		emitter.on('catch', assert('catch'))
		emitter.on('throw', assert('throw'))

		setTimeout(function () {
			emitter.emit('throw', 13, { num: 13 })
		}, 1000)
	})
})

setTimeout(window.close, 10000)
