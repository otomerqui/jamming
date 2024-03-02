import React, { useState } from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2
    },
  ]);
  const [playlistName, setPlaylistName] =useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Track Name 3",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1
    },
    {
      name: "Example Track Name 4",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2
    }
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if(existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
      const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
      setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName,trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    })
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }
  
  return (
    <div>
      <h1>
        Ja<span className="highlight">mm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />      
        <div className="App-playlist">
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          <Playlist  
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
