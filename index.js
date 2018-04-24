const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mkdirp     = require('mkdirp');
//public static final String ANSI_YELLOW_BACKGROUND = "\u001B[43m";
//public static final String ANSI_GREEN_BACKGROUND = "\u001B[42m";
//public static final String ANSI_CYAN_BACKGROUND = "\u001B[46m";
//public static final String ANSI_BLUE_BACKGROUND = "\u001B[44m"; //alternative temporarily selected in place of gray.
//public static final String ANSI_RED_BACKGROUND = "\u001B[41m";  //in place of pale green
//public static final String ANSI_PURPLE_BACKGROUND = "\u001B[45m";   //in place of magenta


//Gray             \e[0;37m
//Dark Gray        \e[1;30m


//ensures empty folder `output` exists without fuss.
mkdirp(path.join(__dirname, 'output'));



const options = {
	uri: `https://www.w3schools.com/html/`,
	transform: function (body) {
		return cheerio.load(body);
	}
};


rp(options)
	.then(function (data) {
		// REQUEST SUCCEEDED: DO SOMETHING
		//console.log(data);

		//data('.large').text()
		// New York

		//var test = data('span[style="color:brown"]').text();
		//var test = data('span').text(); //result: .com×××HTML5HTMLHTML5HTMLHTMLHTMLHTMLHTML Tutorial××
		//var test = data('h3');
		//var test = data('span[style="color:brown"]').html();    //null
		//var test = data('span[style="color:brown"]');    //1 item
		var test = data('.w3-example').text();
		//console.log(test);


		fs.writeFile(path.join(__dirname, "output/GeneratedFile.txt"), test, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});




	})
	.catch(function (err) {
		// REQUEST FAILED: ERROR OF SOME KIND
		console.log("failure to access data with error: " + err);
	});