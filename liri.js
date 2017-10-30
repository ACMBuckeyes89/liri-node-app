//File will contain code to initiade the following commands on terminal
//'my-tweets'
//'spotify-this-song'
//'movie-this'
//'do-what-it-says' 

//Creating a bunch of variables to hold data
var action = process.argv[2];
var value = process.argv[3];
var option = process.argv[4];
var Twitter = require('twitter'); 
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs'); 
//var tweet= require('./keys.js'); --> Commented this out due to now working properly

//Posted the twitter keys to this file since data was not being transferred -->
//--> from keys.js properly.
var twitterKeys = {
	consumer_key: 'dsWTPR3yPElbHGOIHQKX9z5Cu',
	consumer_secret: 'AvQpCguRqB6PWsIhkC8LfH8zFOLlv9M1gCrcZmOC4WwRABYMR6',
	access_token_key: '920481413144576000-cTDVgqQOXkveshonbljGOXabndLFpS7',
	access_token_secret: '4zKH9ngJv7S7DTYwHMj25t52qhMrXcZs6JQbofEnEq8m6',
}
//Posting code to grab tweets from my timeline
var client = new Twitter (twitterKeys);

var params = {screen_name: "landaverde_andy", count: 20};

//Creating function for my-tweets
if (action === "my-tweets") {
	client.get('statuses/user_timeline', params, function(error, data, response) {
		var posts = data;
		for (var i = 0; i < posts.length; i++) {
			console.log("\n================================\n");
			console.log(`Tweets: ${posts[i].text} \nDate: ${posts[i].created_at}`);
			console.log("\n================================\n");
			//console.log(posts[i].created_at);
		}
	});	
}

//Posting code to search for track on Spotify
var newTrack = new Spotify({
	id: 'fa091456b08e44b8be95ec15d0383f58',
	secret: '48f6d1f728944c6eb9f4109ba78ff1fd'
});

if (action === "spotify-this-song") {
	//var song = process.argv[3];
	newTrack.search({type: 'track', query: value}, function(err, data) {
		if (value) {
			var info = data.tracks.items;
			for (var i = 0; i < info.length; i++) {
				console.log('\n=========================\n');
				console.log(`${info[i].name} \n${info[i].album.href} \n${info[i].album.name} \n${info[i].preview_url}`);
				//Passing the artists names through a for loop since their could be 
				//multiple artists with the same song name or similar
				for (var j = 0; j < info[i].artists[j].length; j++) {
					console.log(`${info[i].artists[j].name}`);
				}
				console.log('\n=========================\n');
			}
		} else {
			//In case the song cannot be found, this code should execute
			console.log("Couldn't find the song you entered! But I found something else you might like?");
			console.log('\n=========================\n');
			newTrack.search({type: 'track', query: 'The Sign'}, function(err, data) {
				var info = data.tracks.items;
					console.log(`${info[0].name} \n${info[0].album.href} \n${info[0].album.name}  
						\n${info[0].preview_url} \n${info[0].artists[0].name}`);
		    });
		}        
	});
}   
//Posting code to find a movie using the omdb api key
if(action === "movie-this") {
	var omdb = `https://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=40e9cece`;
	request(omdb, function(error, response, body) {
		if(value) {
			var body = JSON.parse(body);
			console.log('\n=========================\n');
			console.log(`Title: ${body.Title} \nRelease Year: ${body.Year} \nIMDB Rating: ${body.imdbRating}
				\nRotten Tomatoes Rating: ${body.tomatoRating} \nCountry: ${body.Country} \nLanguage: ${body.Language}
				\nPlot: ${body.Plot} \nActors: ${body.Actors}`);
			console.log('\n=========================\n');
		} else {
			console.log("Error!");
		}
	});	
}

//Posting code to execute code if the action variable equals 'do-what-it-says'
if (action === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data){
		console.log(data);
	});
}
