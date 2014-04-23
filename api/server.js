// TODO
// ==================================
// account for single request by ID



var express = 	require("express"),
	http = 		require('http'),
	app = 		express(),
	request = 	require('request');


app.get("/api/*", function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');

	var endpoint = req.url.split('/')[2];
	
	var options = {
		url: 'https://congress.api.sunlightfoundation.com/' + endpoint,
		method: 'GET',
		headers: {
			'content-type': 'application/json; charset=UTF-8',
			'X-APIKEY': '66603c029b1b49428da28d6a783f795e',
			'Access-Control-Allow-Origin': '*'
		}
	};


	// Format Response the ember way
	// {
	// 	'legislators': [{
	// 		'key': value
	// 	}]
	// }

	function callback(error, response, body) {

		// Check the response is ok
	    if (!error && response.statusCode == 200) {
	        var data = JSON.parse(body),
	        	responseData = {};

	       	
	        responseData[endpoint] = data.results;

	        res.send(JSON.stringify(responseData));

	    } else {
	    	res.send(error);
	    }
	}

	request(options, callback);
});

// Set up port
var server = app.listen(3000, function() {
    console.log(' - Listen to port ' + server.address().port);
});
