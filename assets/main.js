/*
//Implicit Grant
User muist visit this link to authorize:
https://accounts.spotify.com/en/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https:%2F%2Fhowell-info.us%2Fprojects%2Fspotify-library2playlist%2Findex.html&response_type=token
*/

const spotifyApi = new SpotifyWebApi()

token = window.location.hash
token = token.substring(14) //Trim off "#access_token="
if(token){
    console.log(token + " success")
    spotifyApi.setAccessToken(token)
}

else{
    //TODO: Prompt user to auth
    console.log("Please auth")
}

spotifyApi.getUserPlaylists()  // note that we don't pass a user id
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });

spotifyApi.getMySavedTracks()
    .then(function(data) {
    console.log('User Tracks', data);
  }, function(err) {
    console.error(err);
  });