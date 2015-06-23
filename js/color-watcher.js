var emitter = require('tab-emitter')()
var inputBox = document.getElementById('input-box')

emitter.on('color', function (clr) {
	document.body.style.backgroundColor = clr
})

function emitColor() {
	if (inputBox.value) {
		emitter.emit('color', inputBox.value)
	}
}
emitColor()
inputBox.addEventListener('change', emitColor)
inputBox.addEventListener('keyup', emitColor)
