# tab-emitter

An event emitter for same-origin tab communication

[![Build Status](https://travis-ci.org/ArtskydJ/tab-emitter.svg?branch=master)](https://travis-ci.org/ArtskydJ/tab-emitter)
[![Dependency Status](https://david-dm.org/artskydj/tab-emitter.svg)](https://david-dm.org/artskydj/tab-emitter)
[![devDependency Status](https://david-dm.org/artskydj/tab-emitter/dev-status.svg)](https://david-dm.org/artskydj/tab-emitter#info=devDependencies)

`tab-emitter` is a client-side javascript module that allows you to send events between browser tabs/windows.
The sending/recieving web pages must have the [same origin](https://en.wikipedia.org/wiki/Same-origin_policy).

`tab-emitter` is written to work with [browserify](https://github.com/substack/node-browserify), and is extremely easy to implement in your code.

# [demo][demo]

[![demo site](https://cloud.githubusercontent.com/assets/1833684/10901712/1558f50c-81b9-11e5-8289-6bf496f9edd0.PNG)][demo]

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
- **Returns** `emitter` which is an [`EventEmitter`](https://nodejs.org/api/events.html#events_class_events_eventemitter) instance.

# install

With [npm](http://nodejs.org/download) do:

	npm install tab-emitter

# license

[VOL](http://veryopenlicense.com)

[demo]: http://artskydj.github.io/tab-emitter/
