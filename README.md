# tab-emitter

[![Dependency Status](https://david-dm.org/artskydj/tab-emitter.svg)](https://david-dm.org/artskydj/tab-emitter)
[![devDependency Status](https://david-dm.org/artskydj/tab-emitter/dev-status.svg)](https://david-dm.org/artskydj/tab-emitter#info=devDependencies)

An event emitter for same-origin tab communication

# example

*client1.js*
```js
var TabEmitter = require('tab-emitter')
var emitter = TabEmitter()

setTimeout(function () {
	emitter.emit('hello', { thing: 'world' })
}, 5000)

emitter.on('hello', function (obj) {
	console.log(obj.thing) // => 'world'
})
```

*client2.js*
```js
var TabEmitter = require('tab-emitter')
var emitter = TabEmitter()

emitter.on('hello', function (obj) {
	console.log(obj.thing) // => 'world'
})
```

# api

```js
var TabEmitter = require('tab-emitter')
```

## `var emitter = TabEmitter([key])`

- `key` is a key to uniquely identify an emitter across tabs. If the same key is used in multiple tabs, they can communicate with each other.
- **Returns** `emitter` which is an instance of an [`EventEmitter`](https://nodejs.org/api/events.html#events_class_events_eventemitter).

# install

With [npm](http://nodejs.org/download) do:

	npm install tab-emitter

# license

[VOL](http://veryopenlicense.com)
