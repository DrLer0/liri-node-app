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
        log(nodeArgs[2] + " " + nodeArgs[3]);
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
        log(nodeArgs[2] + " " + nodeArgs[3]);
        spotifyThis(songName);
        break;
    case "movie-this":
        if (nodeArgs[3] === undefined) {
            var movieName = "Mr. Nobody";
        } else {
            var movieName = nodeArgs[3];
        }
        log(nodeArgs[2] + " " + nodeArgs[3]);
        var MovieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        movieThis(MovieQueryURL);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
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
                    var formatString = `------\n${i+1}:\nVenue: ${name}\nLocation: ${location}\nDate of the event: ${date}`;
                    log(formatString);
                    console.log(formatString);
                }
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                var formatString = `
---------------Data---------------
${error.response.data}
---------------Status---------------
${error.response.status}
---------------Status---------------
${error.response.headers}
`;
                console.log(formatString);
                log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                log("Error" + error.message);
            }
            console.log(error.config);
            log(error.config);
        });
}

function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            log("Error occured" + err);
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0].album.artists[0].external_urls.spotify);
        var Artist = data.tracks.items[0].album.artists[0].name;
        var songName = song;
        var previewLink = data.tracks.items[0].album.artists[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        var formatString = `------\nArtist: ${Artist}\nSong: ${songName}\nLink: ${previewLink}\nAlbum: ${album}`;
        log(formatString);
        console.log(formatString);
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
                log(outputString);
                console.log(outputString);
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                var formatString = `
---------------Data---------------
${error.response.data}
---------------Status---------------
${error.response.status}
---------------Status---------------
${error.response.headers}
`;
                console.log(formatString);
                log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                log("Error" + error.message);
            }
            console.log(error.config);
            log(error.config);
        });
}

function doIt() {
    var liri = [];
    fs.readFile("random.txt", "utf8", function(err, data) {
        // If there was an error reading the file, we log it and return immediately
        if (err) {
            return console.log(err);
        }
        for (var i = 0; i < data.split(/[\r\n]/).length; i++) {
            liri.push(data.split(/[\r\n]/)[i].split(',')[0]);
            liri.push(data.split(/[\r\n]/)[i].split(',')[1]);
            // console.log(liri);
        }
        for (var i = 0; i <= liri.length; i += 2) {
            switch (liri[i]) {
                case "concert-this":
                    var artist = liri[i + 1].replace(/"/gi, '');
                    log(liri[i] + " " + artist);
                    var BandsqueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                    concertThis(BandsqueryUrl)
                    break;
                case "spotify-this-song":
                    if (liri[i + 1] === undefined || liri[i + 1] === '') {
                        var songName = "The Sign";
                    } else {
                        var songName = liri[i + 1];
                    }
                    log(liri[i] + " " + liri[i + 1]);
                    spotifyThis(songName);
                    break;
                case "movie-this":
                    if (liri[i + 1] === undefined || liri[i + 1] === '') {
                        var movieName = "Mr. Nobody";
                    } else {
                        var movieName = liri[i + 1];
                    }
                    log(liri[i] + " " + liri[i + 1]);
                    var MovieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                    movieThis(MovieQueryURL);
                    break;
                case "do-what-it-says":
                    // doIt();
                    log(liri[i]);
                    break;
                default:
                    break;
            }
        }
    });

}

function log(outString) {
    fs.appendFileSync("log.txt", outString + '\n');
}