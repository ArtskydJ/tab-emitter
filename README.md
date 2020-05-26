# tab-emitter

> Emit events between browser tabs! (Same-origin only.)

[![Build Status](https://travis-ci.org/ArtskydJ/tab-emitter.svg?branch=master)](https://travis-ci.org/ArtskydJ/tab-emitter)

`tab-emitter` is a client-side javascript module that allows you to send events between browser tabs/windows.
The sending/recieving web pages must have the [same origin](https://en.wikipedia.org/wiki/Same-origin_policy).
You can not emit events between browsers, only between the same browser.

`tab-emitter` is written to work with [browserify](https://github.com/substack/node-browserify). It should work with Rollup and Webpack too.

# [Demo][demo]

[![demo site](https://cloud.githubusercontent.com/assets/1833684/10901712/1558f50c-81b9-11e5-8289-6bf496f9edd0.PNG)][demo]

# Example

*client1.js*
```js
var TabEmitter = require('tab-emitter')
var emitter = TabEmitter()

setTimeout(() => {
	let data = { x: 'world' }
	emitter.emit('hello', data)
}, 5000)

emitter.on('hello', data => {
	console.log(data.x) // 'world'
})
```

*client2.js*
```js
var TabEmitter = require('tab-emitter')
var emitter = TabEmitter()

emitter.on('hello', data => {
	console.log(data.x) // 'world'
})
```

# Don't use browserify?

If you just want to use this module in the browser without dealing with browserify, here's how you can:

```html
<script src="https://bundle.run/tab-emitter@1.0.11"></script>
<script>
    var emitter = window.tabEmitter()
    
    emitter.on('event', () => {
        console.log('event just happened')
    })
    
    setTimeout(() => {
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
- **Returns** `emitter`, which is an [`EventEmitter`][ee] instance.

## `emitter.emit(eventName, [...args])`

Emits an event to its own browser tab, as well as to other browser tabs of the same-origin.

- `eventName` is a string. `emitter.on` will watch for this string.
- You can have any number of `arg`s. They must be JSON serializable.

## `emitter.on(eventName, handler)`

Watches for events on other browser tabs of the same-origin, as well as its own browser tab.

- `eventName` is a string of the event name to watch for.
- `handler(...args)` is a function that will be called every time the event with the given name is emitted.
	- `...args` are the arguments passed to `emitter.emit(eventName, ...args)`. The `eventName` is not included.

## `emitter.once`, `emitter.removeAllListeners`, `emitter.off`, etc.

For more extended documentation, please look at the official [`EventEmitter`][ee] documentation. Technically, `EventEmitter` is getting polyfilled by your choice of bundler. Likely with [this module](https://www.npmjs.com/package/events). But the API should be identical.


# Install

With [npm](https://nodejs.org/en/download) do:

	npm install tab-emitter

# License

[MIT](http://choosealicense.com/licenses/mit/)

[demo]: https://artskydj.github.io/tab-emitter/
[ee]: https://nodejs.org/docs/latest-v10.x/api/events.html
