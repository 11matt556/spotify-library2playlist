/*
//Implicit Grant
User muist visit this link to authorize:
https://accounts.spotify.com/en/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=http:%2F%2Fhowell-info.us%2Fprojects%2Fspotify-library2playlist%2Findex.html&response_type=token&scope=user-library-read%20playlist-modify-public%20playlist-modify-private
*/

/*
Libraries Used:
Spotify-web-api-js
jQuery 3.3.1
*/
/*TODO: 

FEATURES: 

Display songs in library (excluding playlists)
Display songs from all sources (user playlists, followed, library)
Sort by any song meta-data (Genre, Artist, Name, BPM, etc)
Select multiple songs and add to a new playlist
Filter by playlist, genre, decades *** Add more later (bpm, date added, style, mood, popularity) ***

-------------------------------------------------------
Add songs to existing playlist
Can view all sub-genres of song, not just the top-genre
Play songs in Spotify player, not preview.

Plot for song metadata
Display information about most listened to song
Pie chart for top-genre & sub-genre distribution *** Might be very hard ***
Pie charts for popularity, style, mood, decade

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
    console.log("Getting Tracks...", result)
    return result;
}

//Get multiple sets of tracks
async function getSavedTracks(limit, offset) {
    var promises = [];

    //Get first track
    var track = await getSavedTrack(50, 0);
    var total = track.total;
    promises.push(track);

    //Get rest of tracks
    while ((offset + limit) < total) { //TODO: Batch all requests here to eliminate waterfall effect
        offset = offset + limit;
        track = await getSavedTrack(limit, offset);
        promises.push(track);
    }
    //console.log(promises);
    return Promise.all(promises); //Might not be needed
}

//Get all user tracks in library
async function getAllTracks() {
    //let track = await getSavedTrack(50, 0); //Wait for the first track
    let tracks = await getSavedTracks(50, 0) //Pass size data from first track to get the rest of the tracks
    //tracks.push(track);
    console.log("All Tracks", tracks);
    return tracks;
}

var tracks = getAllTracks();
var userID = spotifyApi.getMe();
var playlistPreReqs = [tracks, userID];

//Finished loading tracks and getting user ID. Now time to do everything else.
Promise.all(playlistPreReqs).then(function (data) {
    //Note: Since userID is in promises[1], user info should be in data[1]
    console.log("Track & User", data);

    //TODO: Put into separate function to handle differences
    //TODO: Convert to templates for readability
    for (let i = 0; i < data[0].length; i++) {
        for (let j = 0; j < data[0][i].items.length; j++) {
            //TODO: Handle multiple artists
            $("#table-body").append("<tr>" + "<td>" + data[0][i].items[j].track.artists[0].name + "</td>" + "<td>" + data[0][i].items[j].track.name + "</td>" + "</tr>")
        }
    }

    //TODO: Create playlist and put songs in it
    spotifyApi.getUserPlaylists(data[1].id).then(function (result) {

        console.log(result);
        var playlistExists = false
        console.log("Checking if playlist with this name already exists...")

        for (var i = 0; i < result.items.length; i++) {
            if (result.items[i].name == 'TestPlaylist') {
                playlistExists = true
            }
        }

        if (playlistExists == false) {
            console.log("Playlist does not exist. Creating new playlist...")
            spotifyApi.createPlaylist(data[1].id, {
                "name": 'TestPlaylist'
            }).then(function (result) {
                console.log("Created Playlist")
                //Now put songs in it
            })
        } else {
            console.log("Playlist already exists.");
        }
    })
})

//Initialize datatables
$(document).ready(function () {
    $('#table_id').DataTable({
        "paging": false,
        "fixedHeader": true,
        "autoWidth": false
    });
});
