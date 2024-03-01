import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    function handleNameChange({ target }) {
        props.onNameChange(target.value);
    }
    
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={handleNameChange}></input>
            <TrackList 
                userSearchResults={props.playlistTracks}
                onRemove={props.onRemove}
                isRemoval={true}
            />
            <button className="Playlist-save">
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;