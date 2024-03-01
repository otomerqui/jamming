import React from "react";
import "./TrackList.css";
import Track from "../Track/Track"

function TrackList(props) {
    return (
        <div className="TrackList">
           {props.userSearchResults.map((track) => (
        <Track
          track={track}
          key={track.id}
         
        />
      ))}
           
        </div>
    );
};

export default TrackList;