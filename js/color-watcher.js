var emitter = require('tab-emitter')()
var inputBox = document.getElementById('input-box')

function emitColor() {
	setTimeout(function () {
		if (inputBox.value) {
			emitter.emit('color', inputBox.value)
		}
	}, 0)
}
emitColor()
inputBox.addEventListener('keydown', emitColor)

emitter.on('color', function (color) {
	document.body.style.backgroundColor = color
})
