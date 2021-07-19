import React from "react";
import './styles/DetailedInfo.css'

function InfoTitle({name, className}) {
    return (
        <h1 className={className}>
            {name}
        </h1>
    );
}

export default InfoTitle;