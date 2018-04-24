const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mkdirp     = require('mkdirp');
const parser = require('html-parse');

const ANSI_YELLOW_BACKGROUND = "\u001B[43m";
const ANSI_GREEN_BACKGROUND = "\u001B[42m";
const ANSI_CYAN_BACKGROUND = "\u001B[46m";
const ANSI_BLUE_BACKGROUND = "\u001B[44m"; //alternative temporarily selected in place of gray.
const ANSI_RED_BACKGROUND = "\u001B[41m";  //in place of pale green
const ANSI_PURPLE_BACKGROUND = "\u001B[45m";   //in place of magenta


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
		let scrapedExample = data('.w3-example').text();

		let tree = parser.parse(scrapedExample);

		let modifiedOutput;

		tree.forEach(function (item, index) {
			console.log (item);
				modifiedOutput += item ;
			});

		fs.writeFile(path.join(__dirname, "output/GeneratedFile.txt"), modifiedOutput, function(err) {
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