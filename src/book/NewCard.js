import React from "react";

function NewCard({ setAddBookActive }) {
    return (
        <div className={"newCard transition"}
             onClick={() => {
                 setAddBookActive(true);
             }}>
            +
            {/*<div className={"title"}>{book.name}</div>*/}
            {/*<div className={"author"}>{book.author}</div>*/}
        </div>
    );
}

export default NewCard;