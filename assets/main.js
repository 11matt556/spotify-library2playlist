/*
//Implicit Grant
User muist visit this link to authorize:
https://accounts.spotify.com/en/authorize?client_id=b1aa5dbffa494726880c00c395523fe6&redirect_uri=https:%2F%2Fhowell-info.us%2Fprojects%2Fspotify-library2playlist%2Findex.html&response_type=token&scope=user-library-read
*/

const spotifyApi = new SpotifyWebApi()

token = window.location.hash
token = token.substring(14) //Trim off "#access_token="
if (token) {
    console.log(token + " success")
    spotifyApi.setAccessToken(token)
} else {
    //TODO: Prompt user to auth
    console.log("Please auth")
}

let offset = 0;

async function getSavedTrack(limit, offset) {//Get single set of tracks of size limit

    let result = await spotifyApi.getMySavedTracks({
        "limit": limit,
        "offset": offset
    });
    console.log("after then");
    return result;
}

async function getUserIDWrapper() {
    let result = await spotifyApi.getMe()
    return result;
}

async function getSavedTracks(limit, offset, total) {//Get multiple sets of tracks up to total, each of size limit
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
    return Promise.all(promises);
    //return promises;
}
/*
getSavedTrack(50, 0).then(function (data) {
    console.log(data);
    var moreData = getSavedTracks(50, data.offset, data.total);
    console.log(moreData);
    moreData.then(function (d) {
        console.log(d);
    })
})
*/

async function getAllTracks() {
    let track = await getSavedTrack(50, 0);
    var results = [];
    //results.push(track);
    console.log("Track", track)
    let tracks = await getSavedTracks(track.limit, track.offset, track.total)
    for(let i=0;i<tracks.length;i++){
        results.push(tracks[i]);
    }
    console.log("Tracks", tracks)
    return tracks;
}

var tracks = getAllTracks();
var userID = getUserIDWrapper();

var promises = [tracks,userID];
Promise.all(promises).then(function(data){
    console.log(data);
})

//Get user id
//Put both in array
//promise.all(array).then(do playlist stuff with user id and tracks)
//console.log(tracks);