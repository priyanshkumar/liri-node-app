require("dotenv").config();
var key = require("./key");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");

var option = process.argv[2];
var search = process.argv.slice(3).join("+");

spotifyThisAPI();

switch (option) {
  case "concert-this":
    concertThis(search);
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "movie-this":
    movieThis(search);
    break;
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(err, data) {
      var command = data.split(",");
      var name = command[1].split("\r\n");
      var names = name[0];

      switch (command[0]) {
        case "concert-this":
          var query = name[0].split(" ");
          concertThis(query[1]);

          break;
        case "spotify-this-song":
          spotify();
          break;
        case "movie-this":
          movieThis(names);
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
  console.log(artist);
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
function spotifyThisAPI() {
  var spotify = new Spotify({
    id: "09d25a091b084cd285a62b82bec622d7",
    secret: "09d25a091b084cd285a62b82bec622d7"
  });

  spotify.search({ type: "track", query: "All the Small Things" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}
