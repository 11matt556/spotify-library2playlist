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

async function getSavedTrack(limit, offset) {
    
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

async function getSavedTracks(limit, offset, total){
    var promises = await [];
    
    while((offset + limit) < total){
        offset = offset + limit;
        var res = await spotifyApi.getMySavedTracks({"limit":limit,"offset":offset})
        promises.push(res);
    }
    
    return promises;
}

getSavedTrack(50,0).then(function(data){
    console.log(data);
    var moreData = getSavedTracks(50,data.offset,data.limit);
    console.log(moreData);
})
