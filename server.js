var $ = require('jquery').create();
var express = require('express');
var colors = require('./colors')();
var hue = require('./hue')($, colors);
var app = express();
/* setup */
hue.setIpAndApiKey('192.168.0.140', 'newdeveloper');

var client_id = "b324895e4b6643f18d5b642f5b137530", access_token = "59e71aa6bb0947039f482f84d35a055f";


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

app.get('/changecolor/:color', function(req, res){
	hue.setAllColors(req.params.color);
	res.send(req.params.color);
});

app.get('/instagram/:tag', function(req, res){
	getLatestInstagramPhotoByTag(req.params.tag, res);
});






/* OUR FUNCS */

var hej = function(){
	console.log(hue);

	var json = { id: 2, name: "Danny boy" };
	return json;
};


var getLatestInstagramPhotoByTag = function(tag, res) {
	var instagramUrl = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + client_id + "&access_token=" + access_token + "&count=1";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: instagramUrl,
		success: function(data)  {
			//console.log(data);
			res.send( '<img src="' + data.data[0].images.standard_resolution.url + '">');
		}
	});
};


/* Start server */
app.listen(3000);
console.log('Listening on port 3000');