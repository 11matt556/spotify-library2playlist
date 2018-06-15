function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const spotifyApi = new SpotifyWebApi()
//jQuery.get('https://accounts.spotify.com/authorize/?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&response_type=code')
/*
async function getAuth() {
    let result = await jQuery.ajax({
        method: "GET",
        url: "https://accounts.spotify.com/authorize/?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&response_type=code",
    })
    return result;
}*/


//https://accounts.spotify.com/en/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https:%2F%2Fhowell-info.us%2Fprojects%2Fspotify-library2playlist%2Findex.html&response_type=token

//Implicit Grant
spotifyApi.setAccessToken('');
let token = spotifyApi.getAccessToken();
console.log(token);

token = getUrlParameter('access_token')
console.log(token + " success")
spotifyApi.setAccessToken(token)

// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist albums', data.headers);
  }, function(err) {
    console.error(err);
});

spotifyApi.getUserPlaylists()  // note that we don't pass a user id
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });
