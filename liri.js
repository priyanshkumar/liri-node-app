//require("dotenv").config();
//var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");

var option = process.argv[2];
var search = process.argv[3];

switch (option) {
  case "concert-this":
    axios({
      method: "GET",
      url:
        "https://rest.bandsintown.com/artists/" +
        search +
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
    break;
}
