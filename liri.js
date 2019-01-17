var env = require("dotenv").config();
var request = require('request');
var nodeSpotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');
var axios = require('axios');
// is this right for the spotify????
var spotify = require('./keys');

// method will be what they are trying to call
var method = process.argv[2];

// argument for what the user inputs
var args = process.argv[3];

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

// functions
// omdb 
var omdb = function(){
    if (!args) {
        args = 'Mr. Nobody';
    }
    axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`)
    .then(function(response, data){
        var movie = JSON.parse(response.data);
        console.log(movie);
        // Still need to change this part, but can't until axios returns the response
        console.log('-------------------------------------------------------');
        console.log(`Title:\t\t${movie.Title}`);
        console.log(`IMDb Rating:\t${movie.Ratings[1].Value}`);
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
// bands-in-town
var concert = function(){
    var bandUrl = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`;
    request(bandUrl, function(error, response, data) {
        if (error) return console.log(error);
        var bands = JSON.parse(data);
        // add moment 
        console.log("the bands are" + bands);
        console.log('-------------------------------------------------------');
        console.log('-------------------------------------------------------');
    });
} 
// spotify

var song = function(){
    var songUrl = `https://api.spotify.com/v1/tracks/${userInput}`;

}

// doWhatItSays

// user input
if (method === "movie-this") {
   omdb();
}

else if (method === "concert-this") {
   concert();
}

else if (method === "spotify-this-song") {
    song();
}

else if (method === "do-what-it-says") {

}
