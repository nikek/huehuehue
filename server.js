var $ = require('jquery').create();
var express = require('express');
var hue = require('./hue');
var app = express();



/* Routes */
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







/* OUR FUNCS */

var hej = function(){
	console.log(hue);

	var json = { id: 2, name: "Danny boy" };
	return json;
};



/* Start server */
app.listen(3000);
console.log('Listening on port 3000');