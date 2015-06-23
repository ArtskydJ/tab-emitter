var emitter = require('tab-emitter')()
var inputBox = document.getElementById('input-box')

inputBox.addEventListener('keydown', function (ev) {
    setTimeout(function () {
        emitter.emit('color', inputBox.value)
    }, 0)
})

emitter.on('color', function (color) {
    document.body.style.backgroundColor = color
})
