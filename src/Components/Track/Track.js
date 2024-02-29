import React from "react";
import "./Track.css";

function Track(props) {
    const renderAction = () => {
        if(props.isRemoval) {
            return (
                <button className="Track-action">-</button>
            );
        } else {
            return (
                <button className="Track-action">+</button>
            ); 
        }
    }
    
    return (
        <div className="Track">
            <div className="Track-information">
                <h3></h3>
                <p>

                </p>
            </div>
            {renderAction()}
        </div>
    );
};

export default Track;