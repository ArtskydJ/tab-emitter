[
	'./relay.html',
	'./test.html'
].forEach(function appendIframe(src) {
	var iframe = document.createElement('iframe')
	iframe.src = src
	document.body.appendChild(iframe)
})
