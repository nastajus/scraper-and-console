const rp = require('request-promise');
const cheerio = require('cheerio');


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
		var test = data('.w3-example').html();
		console.log(test);



	})
	.catch(function (err) {
		// REQUEST FAILED: ERROR OF SOME KIND
		console.log("failure to access data with error: " + err);
	});