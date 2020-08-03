var express = require('express');
var app = express();

var execPHP = require('./execphp.js')();

execPHP.phpFolder = 'C:\\repo\\pharma-crm\\src\\';

app.use('*.php',function(request,response,next) {
	execPHP.parseFile(request.originalUrl,function(phpResult) {
		response.write(phpResult);
		response.end();
	});
});

//app.use('/js', express.static(path.join(__dirname, 'public')))
app.use('/js', express.static('js'))
//app.use('/js', express.static(path.join(__dirname, 'public')))

app.listen(3000, function () {
	console.log('Node server listening on port 3000!');
});