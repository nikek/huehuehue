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

var currentData = {
	colors: ['ff0000', '00ff00', '0000ff'],
	imageUrl: "http://placekitten.com/g/512/512",

	setData: function(colorsArr, imageUrl){
		this.colors = colorsArr;
		this.imageUrl = imageUrl;
		io.sockets.emit('image', this);
	}
};



/* SOCKET */
// Removing all the debug statements
io.set('log level', 1);

// When a client connects
io.sockets.on('connection', function(socket) {
	console.log("client connected! length: " + io.sockets.clients().length);
	socket.emit('connected', { accept: true }); // Tell the new client he is connected.
});





/* Routes */
app.get('/', function(req, res){
	res.render('index.html');
});

/*
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
*/





/* OUR FUNCS */

var setThreeColors = function(colors, res){
	//var colors = ['ff0000', '00ff00','0000ff'];
	var lampstate = [];

	for (var i=0; i < 3; i++) {
		color = colors[i];
		lampstate.push(hue.setColor(i+1, color));
		lampstate.push(hue.setBrightness(i+1, Math.floor(Math.random()*250)));
		// console.log(lampstate);
	}

	return colors;
	//res.send(lampstate);
};

var getColorsFromInstagram = function(instagramPhotoUrl, res){
	//http://marcuslinder.se/image2colors/?image=http://eofdreams.com/data_images/dreams/monkey/monkey-01.jpg
	var urlInstaToColor = 'http://marcuslinder.se/image2colors/?image=' + instagramPhotoUrl;
	console.log(urlInstaToColor);
	$.ajax({
		type: "GET",
		cache: false,
		url: urlInstaToColor,
		success: function(data)  {
			console.log(data);

			currentData.setData(setThreeColors(data), instagramPhotoUrl);
			//var instaColors = getColorsFromInstagram(data.data[0].images.standard_resolution.url);
		}
	});
};

var getLatestInstagramPhotoByTag = function(tag, res) {
	var instagramUrl = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + client_id + "&access_token=" + access_token + "&count=1";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: instagramUrl
	}).done(function(data) {
		//console.log(data)
		//res.send( '<img src="' + data.data[0].images.standard_resolution.url + '">');
		var latestImageUrl = data.data[0].images.standard_resolution.url;
		if(latestImageUrl !== currentData.imageUrl) {
			console.log('get colors from insta NU');
			getColorsFromInstagram(latestImageUrl, res);
		}
		else {
			console.log('no new image');
			io.sockets.emit('noNewImage', true);
		}
	}).always(function() {
		setTimeout(function(){
			change();
		},3000);
	});
};




var change = function() {
	getLatestInstagramPhotoByTag("blue"); // sthlmStartupHack");
};
change();

/* Start server */
app.listen(3000);
console.log('Listening on port 3000');