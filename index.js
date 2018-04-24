const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mkdirp     = require('mkdirp');
const html = require('html-parse');


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

		console.log(scrapedExample);

		let tree = html.parse(scrapedExample);

		let modifiedOutput = "";

		html.traverse(tree, function (node) {

			//the following produces no output, still need to analyze why that is the case.
			console.log(node.name);

			//conditionally insert various colors on various tags here and build up modified string.
			modifiedOutput += item ;
		});

		//currently, accepts input as TEXT, filtering out all the unnecessary ACTUAL HTML it's embedded inside of, leaving us pure text.
		//next, needs conversion to html entity to be properly traversed over as DOM data.
		//next, selectively and intelligently pick out specific complete enclosing tag sets, place on new lines (since I chose to strip out enclosing HTML earlier), and color by inserting characters as-needed.
		//alternatively one could write low-level character-by-character iteration to find individual matching opening and closing tag sets, but that doesn't demonstrate the competency sought.
		//need more time to accomplish this challenge as 99% of my work was backend in Java and Spring, and I only didn't need to traverse the DOM in my previous work, instead I mainly populated simplistic templates by iterating over bean objects in Freemarker templates.

		//finally, the console aspect remains as well.


		fs.writeFile(path.join(__dirname, "output/GeneratedFile.txt"), scrapedExample, function(err) {      //design intention is: replace scrapedExample with modifiedOutput, but not ready
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