var $ = require('jquery').create();
var express = require('express');
var io = require('socket.io').listen(3001);
var colors = require('./colors')();
var hue = require('./hue')($, colors);
var app = express();
app.use(express['static'](__dirname + '/public'));

/* Setup */
hue.setIpAndApiKey('192.168.0.140', 'newdeveloper');

var client_id = "b324895e4b6643f18d5b642f5b137530", access_token = "59e71aa6bb0947039f482f84d35a055f";







/* SOCKET */
// Removing all the debug statements
io.set('log level', 1);

// When a client connects
io.sockets.on('connection', function(socket) {
	console.log("client connected! length: " + io.sockets.clients().length);
	socket.emit('connected', { accept: true }); // Tell the new client he is connected.
});

var i = 0;
var change = function() {
	io.sockets.emit('image', i++);
	setTimeout(function(){ change(); }, 1000);
};
change();








/* Routes */
app.get('/', function(req, res){
	res.render('index.html');
});


app.get('/flashthemall', function(req, res){
	hue.flashAll();
	res.send('Flashade alla.');
});

app.get('/changecolor/:color', function(req, res){
	hue.setAllColors(req.params.color);
	res.send(req.params.color);
});

app.get('/change3colors/:startindex', function(req, res){
	setThreeColors(req.params.startindex, res);

});


app.get('/instagram/:tag', function(req, res){
	getLatestInstagramPhotoByTag(req.params.tag, res);
});






/* OUR FUNCS */


var setThreeColors = function(startindex, res){
	var colors = ['ff0000', '00ff00','0000ff'];
	var lampstate = {};

	for (var i=0; i < 3; i++) {
		color = colors[(i+startindex)%3];
		lampstate += hue.setColor(i+1, color);
		lampstate += hue.setBrightness(i+1, Math.floor(Math.random()*250));
	}
	res.send(lampstate);
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