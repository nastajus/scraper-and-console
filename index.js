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
		console.log(data);
	})
	.catch(function (err) {
		// REQUEST FAILED: ERROR OF SOME KIND
		console.log("failure to access data with error: " + err);
	});