const spotifyApi = new SpotifyWebApi()
// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist albums', data.headers);
  }, function(err) {
    console.error(err);
});

//jQuery.get('https://accounts.spotify.com/authorize/?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&response_type=code')
/*
async function getAuth() {
    let result = await jQuery.ajax({
        method: "GET",
        url: "https://accounts.spotify.com/authorize/?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&response_type=code",
    })
    return result;
}*/

window.location = "https://accounts.spotify.com/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=file%3A%2F%2F%2FZ%3A%2FDocuments%2FPersonal%2520Programming%2520Projects%2Fspotify-library2playlist%2Findex.html&response_type=token"

//Implicit Grant

spotifyApi.getUserPlaylists()  // note that we don't pass a user id
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });