
// -------------------------------------------------------
// Connection functions
// -------------------------------------------------------


var setupSocket = function () {

	//var socket = io.connect('http://localhost:1336');
	var socket = io.connect('http://localhost:3001');
	var img = $('#instaimage');
	// ON CONNECT
	socket.on("connected", function(data) {
		console.log("Socket connected.");
	});

	// ON DELTA
	socket.on("image", function(data) {
		console.log(data);
		img.attr("src",data.imageUrl);
		/*if(data !== ""){
			$('div').html(data);
		}*/
	});

	socket.on("noNewImage", function(data) {
		console.log("no new image");
		/*if(data !== ""){
			$('div').html(data);
		}*/
	});
};

/*
var setupPolling = function () {
	return setInterval(function(){
		teamList.fetch({ cache: false, type: "jsonp",
			success: function(){
				//console.log("Fetched!");
			},
			error: function(error) {
				console.log("Error on fetching. Try refreshing the page in a while.");
				console.log(error);
				clearInterval(pollingInterval);
			}
		});
	}, 120000);
};
*/


// ---------------------------------------------------------
// Setting up a socket and listening for scoreboard changes
// ---------------------------------------------------------

console.log("Trying to set up scoreboard socket..");

if(typeof io !== 'undefined'){
	setupSocket();
} else {
	$('body').html('socket error.. :\'(')
}