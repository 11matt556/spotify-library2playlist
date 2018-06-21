/*
//Implicit Grant
User muist visit this link to authorize:
https://accounts.spotify.com/en/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https:%2F%2Fhowell-info.us%2Fprojects%2Fspotify-library2playlist%2Findex.html&response_type=token&scope=user-library-read%20playlist-modify-public%20playlist-modify-private
*/

const spotifyApi = new SpotifyWebApi()

//TODO: Put into function
token = window.location.hash
token = token.substring(14) //Trim off "#access_token="
if (token) {
    console.log(token + " success")
    spotifyApi.setAccessToken(token)
} else {
    //TODO: Prompt user to auth
    console.log("Please auth")
}

//Get single set of tracks of size limit
async function getSavedTrack(limit, offset) {

    let result = await spotifyApi.getMySavedTracks({
        "limit": limit,
        "offset": offset
    });
    return result;
}

//Get multiple sets of tracks up to total, each of size limit
async function getSavedTracks(limit, offset, total) {
    var promises = [];

    while ((offset + limit) < total) { //TODO: Batch all requests here to eliminate waterfall effect
        offset = offset + limit;
        var res = await spotifyApi.getMySavedTracks({
            "limit": limit,
            "offset": offset
        })
        promises.push(res);
    }
    console.log(promises);
    return Promise.all(promises); //Might not be needed
}

//Get all user tracks in library
async function getAllTracks() {
    let track = await getSavedTrack(50, 0); //Wait for the first track
    let tracks = await getSavedTracks(track.limit, track.offset, track.total) //Pass size data from first track to get the rest of the tracks
    return tracks;
}

var tracks = getAllTracks();
var userID = spotifyApi.getMe();
var promises = [tracks, userID];
//Finished loading tracks and getting user ID
Promise.all(promises).then(function (data) {
    //Note: Since userID is in promises[1], user info should be in data[1]
    console.log(data);
    
    //TODO: Create playlist and put songs in it
    spotifyApi.getUserPlaylists(data[1].id).then(function (result) {
        console.log(result);
        var playlistExists = false
        for (var i in result.items) {
            if (i.name == 'TestPlaylist') {
                playlistExists = true
            }
        }
        if (playlistExists = false) {
            spotifyApi.createPlaylist(data[1].id, {
                "name": 'TestPlaylist'
            })
        }
    })


})
