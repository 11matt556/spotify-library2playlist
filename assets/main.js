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

async function getSavedTracksWrapper(limit, offset) {
    spotifyApi.getMySavedTracks({
            "limit": limit,
            "offset": offset
        })
        .then(function (data) {
            console.log('User Tracks', data);
            if ((offset + limit) < (data.total)) {
                getSavedTracksWrapper(limit, (offset + limit))
            } else {
                //Finished loading tracks

            }

        }, function (err) {
            console.error(err);
        });
}

async function getUserInformationAndLibrary() {
let result1 = await getSavedTracksWrapper(50, 0); //TODO: Currently cannot determine when tracks are finished being retrieved
let result2 = await getUserIDWrapper();
    return result2;
}

async function getUserIDWrapper() {
    var userID = null
    spotifyApi.getMe().then(function (data) {
        console.log('User Data', data);
        userID = data.id;
        console.log('UserID', userID);
    }, function (err) {
        console.error(err)
    })
}

getUserInformationAndLibrary().then(function(){
    console.log("Did the things");
});
