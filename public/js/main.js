$(document).ready(function(){
	window.io = io.connect();
	io.on('connect',function(socket){
		console.log('hi socket');
		io.emit('hello?')
	});
});