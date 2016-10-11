# tab-emitter

> An event emitter for same-origin tab communication

[![Build Status](https://travis-ci.org/ArtskydJ/tab-emitter.svg?branch=master)](https://travis-ci.org/ArtskydJ/tab-emitter)

`tab-emitter` is a client-side javascript module that allows you to send events between browser tabs/windows.
The sending/recieving web pages must have the [same origin](https://en.wikipedia.org/wiki/Same-origin_policy).
You can not emit events between browsers, only between the same browser.

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

# don't use browserify?

If you just want to use this module in the browser without dealing with browserify, here's how you can:

```html
<!DOCTYPE html>
<html>
<head><title>tab-emitter is cool</title></head>
<body>
	<input type="button" value="Say Hello" id="hello-button"/>
	<script src="https://wzrd.in/standalone/tab-emitter@latest"></script>
	<script>
		var messages = [ 'Hello', 'Greetings', 'What\'s up?', 'How\'s it going?', 'Hi', 'Sup Dawg', 'Howdy', 'Yo!', 'What are the hap\'s?', 'Hey!']
		var emitter = window.tabEmitter()
		emitter.on('hello', function (message) {
			var div = document.createElement('div')
			div.innerHTML = message
			document.body.appendChild(div)
		})
		document.getElementById('hello-button').onclick = function () {
			var message = messages[Math.floor(Math.random() * messages.length)]
			emitter.emit('hello', message)
		}
	</script>
</body>
</html>
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
