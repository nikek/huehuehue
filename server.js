var $ = require('jquery').create();
var express = require('express');
var colors = require('./colors');
var hue = require('./hue')($, colors);
var app = express();
/* setup */
hue.setIpAndApiKey('192.168.0.140', 'newdeveloper');


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

app.get('/flashthemall', function(req, res){
	hue.flashAll();
	res.send('Flashade alla.');
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