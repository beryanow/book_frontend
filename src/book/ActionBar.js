import React from "react";

function ActionBar({ setAddQuoteActive, setAddCritiqueActive, bookId, setCurrentBookId, isBookRead, isBookReading, isBookToRead, isBookFavourite, changeState, setState, setNotificationActive, setNotificationMessage, type }) {
    return (
        <div className={"actionBar transition"} onClick={e => e.stopPropagation()}>
            <img src={"/quoteOption.png"} className={"img transition"} onClick={() => {
                setAddQuoteActive(true);
                setCurrentBookId(bookId);
            }}/>
            <img src={"/critiqueOption.png"} className={"img transition"} onClick={() => {
                setAddCritiqueActive(true);
                setCurrentBookId(bookId);
            }}/>
            <img src={"/delimiter.png"} className={"img transition"}/>
            <img src={isBookFavourite ? "/favouriteOptionActive.png": "/favouriteOption.png"} className={"img transition"} onClick={() => {
                changeState(!isBookFavourite, "FAVOURITE", bookId, setState, setNotificationActive, setNotificationMessage, type, null);
            }}/>
            <img src={isBookRead ? "/readOptionActive.png": "/readOption.png"} className={"img transition"} onClick={() => {
                changeState(!isBookRead, "READ", bookId, setState, setNotificationActive, setNotificationMessage, type, null);
            }}/>
            <img src={isBookReading ? "/readingOptionActive.png" : "/readingOption.png"} className={"img transition"} onClick={() => {
                changeState(!isBookReading, "READING", bookId, setState, setNotificationActive, setNotificationMessage, type, null);
            }}/>
            <img src={isBookToRead ? "/toReadOptionActive.png": "/toReadOption.png"} className={"img transition"} onClick={() => {
                changeState(!isBookToRead, "TO_READ", bookId, setState, setNotificationActive, setNotificationMessage, type, null);
            }}/>
        </div>
    )
}

export default ActionBar;