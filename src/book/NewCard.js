import React from "react";

function NewCard({ setAddBookActive }) {
    return (
        <div className={"newCard transition"}
             onClick={() => {
                 setAddBookActive(true);
             }}>
            +
        </div>
    );
}

export default NewCard;