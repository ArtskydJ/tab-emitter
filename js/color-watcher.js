var emitter = require('tab-emitter')()
var inputBox = document.getElementById('input-box')

function setColor(clr) {
	if (inputBox.value !== clr) inputBox.value = clr
	if (clr) document.body.style.backgroundColor = clr
}
setColor('green')
emitter.on('color', setColor)

inputBox.addEventListener('keydown', function () {
	setTimeout(function () {
		emitter.emit('color', inputBox.value)
	}, 0)
})
