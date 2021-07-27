import React, { useEffect, useState } from 'react'
import './styles/Book.css'
import ActionBar from "./ActionBar";

function Card({ book, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState }) {
    const [imgState, setImgState] = useState({ imageIsReady: false, imageSource: '' });
    const background = localStorage.getItem(book.name + "_background");
    const backgroundUrl = 'url(data:image/png;base64,' + background + ')';

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImgState({ imageIsReady: true, imageSource: img.src });
        }
        img.src = 'http://localhost:8080/file/download/' + book.name + '.png';
    }, [book.name]);

    return (
        <div className={"cover"}>
            <div className={"card transition"}
                 style={{ backgroundImage: backgroundUrl }}
                 onClick={() => {
                     setDescriptionActive(true);
                     setSelectionBook(book);
                 }}>

                <div className={"title"}>{book.name}</div>
                <div className={"author"}>{book.author}</div>
                <div className={"removeLabel transition"} onClick={e => {
                    e.stopPropagation();
                    setCurrentBookId(book.id);
                }}>
                    <img onClick={() => setRemoveBookActive(true)} src={"/removeLabel.png"}/>
                </div>
                <ActionBar setAddQuoteActive={setAddQuoteActive}
                           setAddCritiqueActive={setAddCritiqueActive}
                           bookId={book.id}
                           addNewQuote={addNewQuote}
                           setCurrentBookId={setCurrentBookId}
                           isBookRead={book.read.flag}
                           isBookReading={book.reading.flag}
                           isBookToRead={book.toRead.flag}
                           isBookFavourite={book.favourite.flag}
                           changeState={changeState}
                           setState={setState}/>
            </div>
        </div>
    );
}

export default Card;