import React from "react";
import './styles/Book.css'

function Title({ name }) {
    return (
        <h1 className={"bigTitle"}>
            {name}
        </h1>
    );
}

export default Title;