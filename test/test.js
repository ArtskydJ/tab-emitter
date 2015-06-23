var test = require('tape')
var after = require('after')
var TabEmitter = require('../index.js')
document.body.innerHTML = '<h1>test</h1>'

test('namespaces work', function (t) {
	t.plan(1)
	var emitter1 = TabEmitter('yes')
	var emitter2 = TabEmitter('no')

	emitter1.on('x', t.pass.bind(t))
	emitter2.on('x', t.fail.bind(t))

	emitter1.emit('x', 13)

	t.end()
})

test('relay works', function (t) {
	console.log('#RELAY WORKS')
	t.plan(6)
	var emitter = TabEmitter('relay')
	window.em = emitter
	var end = after(2, t.end.bind(t))

	function assert(a, b, c) {
		t.equal(a, 13)
		t.deepEqual(b, { num: 13 })
		t.equal(c, undefined)
		end()
	}

	emitter.on('rebounce', assert)
	emitter.on('bounce', assert)

	emitter.emit('bounce', 13, { num: 13 })
})
