import React, { useEffect, useState } from 'react'
import './styles/Book.css'

function Card({ book, setDescriptionActive, setSelectionBook }) {
    const [state, setState] = useState({ imageIsReady: false, imageSource: '' });

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setState({ imageIsReady: true, imageSource: img.src });
        }
        img.src = 'http://localhost:8080/file/download/' + book.name + '.png';
    }, [book.name]);

    return (
        <div className={"card transition"}
             style={{ backgroundImage: 'url(' + state.imageSource + ')' }}
             onClick={() => {
                 setDescriptionActive(true);
                 setSelectionBook(book);
             }}>

            <div className={"title"}>{book.name}</div>
            <div className={"author"}>{book.author}</div>
        </div>
    );
}

export default Card;