import React, { useEffect, useState } from 'react'
import './styles/Book.css'
import ActionBar from "./ActionBar";

function Card({ book, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type }) {
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

                {book.read.flag ? book.read.rating !== null ? <div className={"rating"} onClick={e => e.stopPropagation()}>
                    {Array(5).fill(0).map((_ , index) => <img onMouseEnter={() => {
                        for (let i = 0; i <= index; i++) {
                            document.getElementById(book.name + "_star_" + i).src = "/star_choose.png";
                        }
                        for (let i = index + 1; i < 5; i++) {
                            document.getElementById(book.name + "_star_" + i).src = "/star.png";
                        }
                    }} onMouseLeave={() => {
                        for (let i = 0; i < parseInt(book.read.rating); i++) {
                            document.getElementById(book.name + "_star_" + i).src = "/star_active.png";
                        }
                        for (let i = parseInt(book.read.rating); i < 5 - parseInt(book.read.rating); i++) {
                            document.getElementById(book.name + "_star_" + i).src = "/star.png";
                        }
                    }} onClick={() => {
                        changeState(book.read.flag, "READ", book.id, setState, setNotificationActive, setNotificationMessage, type, (index + 1).toString());
                    }} className={"star"} src={index < parseInt(book.read.rating) ? "/star_active.png" : "/star.png"} id={book.name + "_star_" + index}/>)}
                </div> : <div className={"rating"}/> : null}

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
                           setState={setState}
                           setNotificationActive={setNotificationActive}
                           setNotificationMessage={setNotificationMessage}
                           type={type}/>
            </div>
        </div>
    );
}

export default Card;