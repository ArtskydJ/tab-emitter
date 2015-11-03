var test = require('tape')
var TabEmitter = require('../index.js')

test('namespaces work', function (t) {
	t.plan(2)
	var emitter1 = TabEmitter('yes')
	var emitter2 = TabEmitter('no')
	var emitter3 = TabEmitter('yes')

	emitter1.on('x', function (a) { t.equal(a, 13) })
	emitter2.on('x', t.fail.bind(t))
	emitter3.on('x', function (a) { t.equal(a, 13) })

	emitter1.emit('x', 13)
	setTimeout(t.end.bind(t), 100)
})

test('relay works', function (t) {
	t.plan(9)
	var emitter = TabEmitter('relay')
	var called = 0

	function assert(name) {
		return function (a, b, c, d) {
			t.equal(a, 13, name)
			t.deepEqual(b, { num: 13 }, name)
			t.equal(c, undefined, name)
			t.equal(d, undefined, name)
			called++
		}
	}

	emitter.on('catch', assert('catch'))
	emitter.on('throw', assert('throw'))

	setTimeout(function () {
		emitter.emit('throw', 13, { num: 13 })
	}, 1000)
	setTimeout(function () {
		t.equal(called, 2, 'assert was called 2x')
		t.end()
	}, 2000)
})

test(function () {
	require('http').get(test.getHarness()._results.pass ? '/pass' : '/fail')
})
