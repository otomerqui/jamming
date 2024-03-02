const clientID = "2a11c893ffd84f3fb1445e70fef3f690";
const redirectUrl = "http://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenInURL && expiryTime) {
            // set access token and expiry time variables
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            //set function to reset the token acces when it expires
            window.setTimeout(() => (accessToken = ''), expiresIn*1000);

            //Clear the url after the access token has expires
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }
        // Third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
    },   
    
    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse) {
              console.error("Response error");
            }
            return jsonResponse.tracks.items.map((t) => ({
              id: t.id,
              name: t.name,
              artist: t.artists[0].name,
              album: t.album.name,
              uri: t.uri,
            }));
          });
      },

      savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, { headers: header })
          .then((response) => response.json())
          .then((jsonResponse) => {
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers: header,
              method: "post",
              body: JSON.stringify({ name: name }),
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  {
                    headers: header,
                    method: "post",
                    body: JSON.stringify({ uris: trackUris }),
                  }
                );
              });
          });
      },
};

export default Spotify;