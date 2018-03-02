//==================================================================================

//REQUIRE VARIABLES*****

//==================================================================================
// Require dotenv to ...
require("dotenv").config();
// Require fs to read/write files
var fs = require("fs");
// Key.js is a variable made for easier flow and no accumulation
var keys = require("./key.js");
//Twitter Require
var Twitter = require('twitter');
// Spotify Require
var Spotify = require('node-spotify-api');
// Movie Request
var request = require("request");

//==================================================================================

//INTERACTIVE VARIABLES *****

//==================================================================================

var everything = process.argv;
// Var for the argument being displayed [2] (ex: "my-tweets")
var Argument = process.argv[2];

var Argument2 = process.argv[3];
// Var for the userInput (ex: Movie Name, etc..)
var userInput = "";
//Need this to access twitter info
var client = new Twitter(keys.twitter);
//Need this to access spotify info
var spotify = new Spotify(keys.spotify);
//Twiter parameters
var params = {
    screen_name: "codingiskool",
    count: 20,
}
//Spotify parameters
// var params2 = {
//     type: "track",
//     query: userInput,
// }



//==================================================================================

//MAIN LOGIC *****

//==================================================================================



// switch is going to grab in whatever we want to continously manipulate..
switch (Argument) {
    case "my-tweets":
        tweetsFunction()
        break;

    case "spotify-this-song":
        songs()
        break;

    case "movie-this":
        movies()
        break;

    case "do-what-it-says":
        whatevs()
        break;
}


//==================================================================================

//FUNCTIONS *****

//==================================================================================


function tweetsFunction() {
 
    client.get("statuses/user_timeline", params, function (error, tweets, response) {

        if (error) {

            console.log("Errors Found: " + error);

        } else if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    })
};


//----------------------------------------------------------------------------------


function songs() {
 
    for (var i = 3; i< everything.length; i++)
    userInput += everything[i] + " ";
    
    spotify.search({type: "track", query: userInput}, function (err, data) {

        var songInfo = data.tracks.items[0];

        if (err) {

            console.log("Errors Found: " + err);

        }

        console.log("Artist(s): " + songInfo.artists[0].name);
        console.log("Song Name: " + songInfo.name);
        console.log("Preview Link: " + songInfo.preview_url);
        console.log("Album: " + songInfo.album.name);
    });
};

//----------------------------------------------------------------------------------


function movies() {

    request('http://www.omdbapi.com/?t=' + Argument2 + '&apikey=trilogy', function (error, response, body) {

        if (error) {
            console.log("Errors Found: " + error);

        } else {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of Release: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
};



//----------------------------------------------------------------------------------

function whatevs() {
    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            console.log("Errors Found: " + error);
        } else {
            console.log(data)
            var dataArr = data.split(","); 
              userInput = dataArr[1];
              songs();
              console.log(dataArr)



        }
    });
}

//==================================================================================

// END *****

//==================================================================================



