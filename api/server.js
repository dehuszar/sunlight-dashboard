// TODO
// ==================================
// account for single request by ID



var express = 		require('express'),
	http = 			require('http'),
	querystring = 	require('querystring'),
	request = 		require('request'),
	app = 			express();


app.get('/api/*', function(req, res) {

	var params = 	req.params[0].split('/'),
		endpoint = 	params[0],
		id = 		params[1],
		query;


	// Allow front end to read from this endpoint (CORS)
	res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');


	// add id to query
	if(id) req.query.bioguide_id = id;

	query = querystring.stringify(req.query);

	
	// Options for the request
	var options = {
		url: 'https://congress.api.sunlightfoundation.com/' + endpoint,
		method: 'GET',
		headers: {
			'content-type': 'application/json; charset=UTF-8',
			'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
		}
	};


	// Add query to request url
	if(query) options.url = options.url  + '?' + query;
	
	console.log('Request from - ' + options.url);


	// Triggers upon a response 
	function callback(error, response, body) {

		// Check the response is ok
		if (!error && response.statusCode == 200) {
			
			var data = JSON.parse(body),
				responseData = {};
			
			// Format Response the ember way
			// { 'legislators': [{ 'key': value }] }
			responseData[endpoint] = data.results;

			// Send back response!
			res.send(JSON.stringify(responseData));

		}
	}

	// Make the request
	request(options, callback);
});



// Set up port
var server = app.listen(3000, function() {
	console.log(' - Listen to port ' + server.address().port);
});
