require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;


switch (nodeArgs[2]) {
    case "concert-this":
        var artist = nodeArgs[3];
        var BandsqueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        concertThis(BandsqueryUrl)
        break;
    case "spotify-this-song":
        if (nodeArgs[3] === undefined) {
            var songName = "The Sign";
        } else {
            var songName = nodeArgs[3];
        }
        spotifyThis(songName);
        break;
    case "movie-this":
        if (nodeArgs[3] === undefined) {
            var movieName = "Mr. Nobody";
        } else {
            var movieName = nodeArgs[3];
        }
        var MovieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        movieThis(MovieQueryURL);
        break;
    case "do-what-it-says":
        break;
}

function concertThis(queryUrl) {
    axios.get(queryUrl).then(
            function(response) {
                for (var i = 0; i < 10; i++) {
                    var name = response.data[i].venue.name;
                    var location = response.data[i].venue.city + ", " + response.data[i].venue.country;
                    var date = moment(response.data[i].datetime);
                    date = date.format("MM/DD/YYYY")

                    console.log("------\n%i:\nVenue: %s\nLocation: %s\nDate of the event: %s", i + 1, name, location, date);
                }
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0].album.artists[0].external_urls.spotify);
        var Artist = data.tracks.items[0].album.artists[0].name;
        var songName = song;
        var previewLink = data.tracks.items[0].album.artists[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        console.log("Artist: %s\nSong: %s\nLink: %s\nAlbum: %s", Artist, songName, previewLink, album);
    });
}

function movieThis(movieQURL) {
    axios.get(movieQURL).then(
            function(response) {
                // console.log(response.data);
                var title = response.data.Title;
                var releaseYear = response.data.Year;
                var IMDBRating = response.data.imdbRating;
                var RTRating = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;
                var outputString =
                    `
* Title: ${title}
* Year Released: ${releaseYear}
* IMDB Rating: ${IMDBRating}
* Rotten Tomatoes Rating: ${RTRating}
* Country produced in: ${country}
* Langauge of mmove: ${language}
* Plot: ${plot}
* Actors: ${actors}
`
                console.log(outputString);
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}