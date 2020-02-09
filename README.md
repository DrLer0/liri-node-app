# LIRI - Language Interpretation and Recognition Interface
### Motivation
  Create a CLI App to utilize npm APIs and expand on what I learned from class and demonstrate how to install npm API and take user input from the command line.
  
 ### Overview
   LIRI uses logic and code inside `liri.js` to take user input and then output data to the command line. Necessary Node packages to install yourself using `npm -i` are `Node-Spotify-API` `Axios` `Moment` and `DotEnv`. Additionally, you need to create your own `.env` and place your client and secret API key for `Node-Spotify-API`.
   
### Instructions
  1. Install required Node packages using `npm -i`.
  2. Create your own `.env` file just as below and place your clientID and Secret Key from Spotify `https://developer.spotify.com/my-applications/#!/`:
  ```javascript
      SPOTIFY_ID=your-spotify-id
      SPOTIFY_SECRET=your-spotify-secret
```
  3. `cd liri-node-app` and run `node liri.js <option> "<Artist | Song | Movie | none>"` with replacing option with one of the below:
* Option:
  * `concert-this "<Artist>"`
  * `spotify-this-song "<Song>"`
  * `movie-this "<Movie>"`
  * `do-what-it-says`
  
4. The app will run after pressing `Enter` and the data will be written to the command line; as well as, logged into log.txt.
5. If `Artist` `Song` or `Movie` are missing, then a defualt value will be used to run the respective commands.

### Screenshots


### Link
https://github.com/DrLer0/liri-node-app

### Technoligies Used
* Node.js
* npm
  * `Node-Spotify-API` `Axios` `Moment` `fs` and `DotEnv`
* OMDB API
* BandsInTown API
  
# Role
Developer
