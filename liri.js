// storing all requires that will be used into their own variables
var env = require("dotenv").config();
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var axios = require('axios');
var keys = require('./keys');
// this one adds new contruct to the one that is passed from keys.spotify
var spotify = new Spotify(keys.spotify);

// method will be what they are trying to call(omdb, spotify, dowhatitsays)
var method = process.argv[2];

// argument for what the user inputs
var args = process.argv;

// stores the user input and checks to see if the input has multiple words. 
var userInput = "";
for(var i = 3; i < args.length; i++) {
  if(i > 3 && i < args.length) {
    userInput += "+" + args[i]
  }
  else {
    userInput += args[i]
  }
}

// functions that will grab the information from the api's

// omdb 

var omdb = function(){
    // if the user does not input a movie, default to Mr. Nobody
    if (args.length < 4) {
        userInput = 'Mr. Nobody';
    }
    console.log(userInput)
    axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`)
    .then(function(response, data){
        // store the response in a variable and then log each parameter. 
        var movie = response.data
        console.log('-------------------------------------------------------');
        console.log(`Title:\t\t${movie.Title}`);
        console.log(`IMDb Rating:\t${movie.Ratings[0].Value}`);
        console.log(`Country:\t${movie.Country}`);
        console.log(`Language:\t${movie.Language}`);
        console.log(`Plot:\t\t${movie.Plot}`);
        console.log(`Actors:\t\t${movie.Actors}`);
        console.log('-------------------------------------------------------');

    })
    .catch(function(err){
        console.error(err);
    })
    
}

// spotify

var song = function(){
    // if the user does not input a song, default to The Sign by Ace of Base.
    if (args.length < 4){
        userInput = 'The Sign';
    }
    spotify.search({ type: 'track', query: userInput }) 
    .then(function(data) {
        // store the response inside the songResp variable
      var songResp = data.tracks.items;
        // forEach loop through each response, pass the value of track, and get the info for each parameter.
      songResp.forEach(function(track){
        console.log('-------------------------------------------------------');
        console.log(`Song:\t\t${track.name}`);
        console.log(`Artist:\t\t${track.artists[0].name}`);
        console.log(`Album:\t\t${track.album.name}`);
        console.log(`Preview:\t${track.preview_url}`);
        console.log('-------------------------------------------------------');
      });
    })
    .catch(function(err){
        console.log(err);
    })

};

// doWhatItSays

var says = function(){

}

// checks the method input, then runs the appropriate function
if (method === "movie-this") {
   omdb();
}

else if (method === "spotify-this-song") {
    song();
}

else if (method === "do-what-it-says") {

}
