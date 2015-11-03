var emitter = require('tab-emitter')()
var input = document.querySelector('input')

function setColor(color) {
	if (input.value !== color) input.value = color
	if (color) document.body.style.backgroundColor = color
}
setColor('white')
emitter.on('color', setColor)

input.addEventListener('keydown', function () {
	setTimeout(function () {
		emitter.emit('color', input.value)
	}, 0)
})
