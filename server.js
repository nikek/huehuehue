var express = require('express');
var app = express();


app.get('/', function(req, res){
  res.send('Hello World');
});


app.get('/yo', function(req, res){
	var responseText = hej();
  res.send(responseText);
});

app.get('/lindercolor', function(req, res){
	res.send('yo');
});


var hej = function(){
	return "yo man";
};



app.listen(3000);
console.log('Listening on port 3000');