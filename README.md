## liri-node-app

### Node Package Installed

    Node-Spotify-Api
    Axios
    Moment
    DotEnv

### About

- This app has 4 phase:

  1. concert-this:

     - Which take the command from terminal and output foolowing things by sending api request to Bands in town api with help of axios
       ```
       * Name of the venue
       * Venue location
       * Date of the Event (use moment to format this as "MM/DD/YYYY")
       ```

  2. spotify-this-song:

     - Which take the command from terminal and output following things by sending api request to Spotify api
       ```
       * Artist(s)
       * The song's name
       * A preview link of the song from Spotify
       * The album that the song is from
       ```

  3. movie-this:

     - Which take the command from terminal and output following things by sending api request to OMDB api with help of axios
       ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       ```

  4. do-what-it-says:

     - As soon as compiler gets command from terminal it will read data from random.txt with help of fs and throw the qury again for anyone of the above phase with help of nested switch case as per phase mention in random.txt

### Build with:

JavScript, Node.
