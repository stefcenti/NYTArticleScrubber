// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
// var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";
// This variable will be pre-programmed with our authentication key (the one we received when we registered)
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(topic, begin_date, end_date){

		console.log(topic+"|"+begin_date+"|"+end_date);

		// Based on the searcTopic we will create a queryURL 
		let queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
		//Figure out the geolocation
		let queryURL = queryURLBase + topic + "&pretty=1" +"&begin_date="+begin_date + "&end_date="+end_date;
//		let queryURL = queryURLBase + topic;

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				console.log(response.data.response.docs[0]);
				return response.data.response.docs[0];

			}).catch(function(error) {
				console.log(error);
			});
	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(location){

		return axios.post('/api', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}
/*
// On Click button associated with the Search Button
$('#runSearch').on('click', function(){

	// Initially sets the articleCounter to 0
	articleCounter = 0;

	// Empties the region associated with the articles
	$("#wellSection").empty();

	// Search Topic
	var searchTopic = $('#searchTopic').val().trim();
	queryURL = queryURLBase + searchTopic;

	// Num Results
	numResults = $("#numRecordsSelect").val();

	// Start Year
	startYear = $('#startYear').val().trim();

	// End Year
	endYear = $('#endYear').val().trim();

	// If the user provides a startYear -- the startYear will be included in the queryURL
	if (parseInt(startYear)) {
		queryURL = queryURL + "&begin_date=" + startYear + "0101";
	}

	// If the user provides a startYear -- the endYear will be included in the queryURL
	if (parseInt(endYear)) {
		queryURL = queryURL + "&end_date=" + endYear + "0101";
	}

	// Then we will pass the final queryURL and the number of results to include to the runQuery function
	runQuery(numResults, queryURL);

	// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
	return false;
});
*/

// We export the helpers function 
module.exports = helpers;