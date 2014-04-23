// TODO
// ==================================
// I'm sure there more here to do


var express = 		require('express'),
	geocoder = 		require('geocoder'),
	request = 		require('request'),
	http = 			require('http'),
	querystring = 	require('querystring'),
	app = 			express();



// Makes request based on options
// ========================================================
var makeRequest = function(res, endpoint, options){

	// Triggers upon a response 
	function callback(error, response, body) {

		// Check the response is ok
		if (!error && response.statusCode == 200) {
			
			var data = JSON.parse(body),
				responseData = {};
			
			// Format Response the ember way
			// { 'legislators': [{ 'key': value }] }
			responseData[endpoint] = data.results;

			// Allow front end to read from this endpoint (CORS)
			res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');

			// Send back response!
			res.send(JSON.stringify(responseData));

		}
	}

	console.log(' - Requesting: ' + options.url);
	// Make the request
	request(options, callback);
};




// Return Sunlight Foundation options
// ========================================================
var createOptions = function(req, res, idKey, endpointOverride){
	var params = 	req.path.split('/'),
		endpoint = 	endpointOverride || params[2],
		id = 		params[3],
		query;

	// add id to query
	if(id && idKey) req.query[idKey] = id;

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

	return options;
}




// ROUTES
// ========================================================
app.get('/api/legislators*', function(req, res) {
	
	// If there is an address, find the coords before making query
	if(req.query.address){
		
		// Make the location request
		geocoder.geocode(req.query.address, function ( err, data ) {

			// Get coords
			var coords = data.results[0].geometry.location;

			// Add cords to query
			req.query.latitude = coords.lat;
			req.query.longitude = coords.lng;

			// Remove address, its no longer needed
			delete req.query.address;

			makeRequest(res, 'legislators', createOptions(req, res, 'bioguide_id', 'legislators/locate'));
		});

	} else {
		// No address?  Handle it normally
		makeRequest(res, 'legislators', createOptions(req, res, 'bioguide_id'));	
	}
});


//Wildcard route
app.get('/api/*', function(req, res) {
	var endpoint = req.path.split('/')[2];
	makeRequest(res, endpoint, createOptions(req, res));
});




// Set up port
// ========================================================
var server = app.listen(3000, function() {
	console.log(' - Listen to port ' + server.address().port);
});
