# tab-emitter

> An event emitter for same-origin tab communication

[![Build Status](https://travis-ci.org/ArtskydJ/tab-emitter.svg?branch=master)](https://travis-ci.org/ArtskydJ/tab-emitter)

`tab-emitter` is a client-side javascript module that allows you to send events between browser tabs/windows.
The sending/recieving web pages must have the [same origin](https://en.wikipedia.org/wiki/Same-origin_policy).
You can not emit events between browsers, only between the same browser.

`tab-emitter` is written to work with [browserify](https://github.com/substack/node-browserify), and is extremely easy to implement in your code.

# [Demo][demo]

[![demo site](https://cloud.githubusercontent.com/assets/1833684/10901712/1558f50c-81b9-11e5-8289-6bf496f9edd0.PNG)][demo]

# Example

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

# Don't use browserify?

If you just want to use this module in the browser without dealing with browserify, here's how you can:

```html
<script src="https://wzrd.in/standalone/tab-emitter@1"></script>
<script>
    var emitter = window.tabEmitter()
    
    emitter.on('event', function () {
        console.log('event just happened'))
    })
    
    setTimeout(function () {
        emitter.emit('event')
    }, 5000)
</script>
```

# API

```js
var TabEmitter = require('tab-emitter')
```

## `var emitter = TabEmitter([key])`

- `key` is a key to uniquely identify an emitter across tabs. If the same key is used in multiple tabs, they can communicate with each other.
- **Returns** `emitter` which is an [`EventEmitter`](https://nodejs.org/api/events.html#events_class_events_eventemitter) instance.

# Install

With [npm](http://nodejs.org/download) do:

	npm install tab-emitter

# License

[MIT](http://choosealicense.com/licenses/mit/)

[demo]: http://artskydj.github.io/tab-emitter/
