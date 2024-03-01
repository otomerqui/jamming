import React, { useState } from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

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
  
  return (
    <div>
      <h1>
        Ja<span className="highlight">mm</span>ing
      </h1>
      <div className="App">
        <SearchBar />      
        <div className="App-playlist">
          <SearchResults userSearchResults={searchResults} />
          <Playlist  
            playlistName={playlistName}
            playlistTracks={playlistTracks}
          />
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
