require("dotenv").config();
var key = require("./key");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
  id: key.spotify.id,
  secret: key.spotify.secret
});

var option = process.argv[2];
var search = process.argv.slice(3).join("+");

switch (option) {
  case "concert-this":
    concertThis(search);
    break;
  case "spotify-this-song":
    spotifySong(search);
    break;
  case "movie-this":
    movieThis(search);
    break;
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(err, data) {
      var command = data.split(",");
      var name = command[1].split("\r\n");
      var names = name[0].replace(/"/g, "");
      console.log(names);

      switch (command[0]) {
        case "concert-this":
          concertThis(names);
          break;
        case "spotify-this-song":
          spotifySong(names);
          break;
        case "movie-this":
          movieThis(names);
          break;
        default:
          console.log("Command did not dound or wrong in random.txt");
          break;
      }
      if (err) {
        console.log(err);
      }
    });
    break;
  default:
    console.log("Wrong input! Try again");
    break;
}

// func concert-this
function concertThis(artist) {
  axios({
    method: "GET",
    url:
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp"
  })
    .then(function(response) {
      for (var key in response.data) {
        console.log("Name of the venue: " + response.data[key].venue.name);
        console.log(
          "venue Location: " +
            response.data[key].venue.city +
            ", " +
            response.data[key].venue.country
        );
        var date = moment(response.data[key].datetime).format("MM/DD/YYYY");
        console.log("Date: " + date);
        var time = moment(response.data[key].datetime).format("hh:mm A");
        console.log("Time: " + time);
        console.log("----------------------");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// func movie-this
function movieThis(movie) {
  if (!movie) {
    movie = "Mr.+Nobody";
  }
  axios({
    method: "GET",
    url: "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
  })
    .then(function(response) {
      var data = response.data;
      console.log("Title: " + data.Title);
      console.log("Release Date: " + data.Released);
      console.log("IMDB Rating: " + data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
      console.log("Language: " + data.Language);
      console.log("Plot: " + data.Plot);
      console.log("Actors: " + data.Actors);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// func spotify
function spotifySong(song) {
  if (!song) {
    song = "The+Sign";
  }
  spotify
    .search({ type: "track", query: song })
    .then(function(response) {
      var sName = song.split("+").join(" ");
      console.log("Name of Song: " + sName);
      console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log(
        "Preview Link: " + response.tracks.items[0].external_urls.spotify
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}
