var test = require('tape')
var TabEmitter = require('../index.js')

// var iframe = document.createElement('iframe')
// iframe.src = ''
// document.body.appendChild(iframe)

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
	t.plan(4)
	var emitter = TabEmitter('relay')

	var calledOne = 0
	emitter.on('one', function (a) {
		t.equal(a, 13, 'one worked!')
		calledOne++
	})

	var calledTwo = 0
	emitter.on('two', function (b) {
		t.deepEqual(b, { num: 13 }, 'two worked')
		calledTwo++
	})

	setTimeout(function () {
		emitter.emit('one', 13, { num: 13 })
	}, 200)
	setTimeout(function () {
		t.equal(calledOne, 1, 'assert "one" was called 1x')
		t.equal(calledTwo, 1, 'assert "two" was called 1x')
		t.end()
	}, 600)
})
