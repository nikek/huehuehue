
// -------------------------------------------------------
// Connection functions
// -------------------------------------------------------


var setupSocket = function () {

	//var socket = io.connect('http://localhost:1336');
	var socket = io.connect('http://localhost:3001');
	var img = $('#theImage');

	// ON CONNECT
	socket.on("connected", function(data) {
		console.log("Socket connected.");
	});

	// ON DELTA
	socket.on("image", function(data) {
		console.log(data);
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
	$('body').html('socket error.. :\'(');
}



// jQuery fn gradientGenerator

;(function($) {
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    var methods = {
        init: function (settings) {

            settings = $.extend( {
              'colors'         : ['red', 'blue', 'green'],
              'direction'      : 'left'
            }, settings);

            return this.each(function(){
                if($.isArray(settings.colors) && settings.colors.length >= 2) {
                    $(this).css({ 'background':
                        methods.gradientToString(settings.colors, settings.direction)
                    });
                } else {
                    $.error('Please pass an array');
                }

            });

        },
        gradientToString: function (colors, direction) {

            var nbColors = colors.length;

            //If no percent, we need to calculate them
            if(colors[0].percent === undefined) {

                //Passed only colors as an array we make it an object
                if(colors[0].color === undefined) {
                    var tmp = [];
                    for(i=0; i < nbColors; i++)
                        tmp.push({'color':colors[i]});

                    colors = tmp;
                }

                var p = 0,
                    percent = 100 / (nbColors - 1);

                //calculate percent
                for(i=0; i< nbColors; i++) {
                    p = i === 0 ? p : (i == nbColors-1 ? 100 : p + percent);
                    colors[i].percent = p;
                }
            }

            var to = isSafari ? '' : 'to';

            //build the string
            var gradientString = isSafari ? '-webkit-linear-gradient(' : 'linear-gradient(';

           gradientString += to +' '+ direction;

            for(i=0; i < nbColors; i++)
               gradientString += ', '+ colors[i].color + ' ' + colors[i].percent + '%';

            gradientString += ')';
            return gradientString;

        }

    };

    $.fn.gradientGenerator = function () {
        return methods.init.apply( this, arguments );
    };
})(jQuery);