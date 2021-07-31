import React from "react";

function Rating({changeState, book, setState, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div className={"ratingOnly"} onClick={e => e.stopPropagation()}>
            {Array(5).fill(0).map((_, index) => <img onMouseEnter={() => {
                for (let i = 0; i <= index; i++) {
                    document.getElementById(book.name + "_star_" + i).src = "/star_choose.png";
                }
                for (let i = index + 1; i < 5; i++) {
                    document.getElementById(book.name + "_star_" + i).src = "/star.png";
                }
            }} onMouseLeave={() => {
                for (let i = 0; i < 5; i++) {
                    document.getElementById(book.name + "_star_" + i).src = "/star.png";
                }
                for (let i = 0; i < parseInt(book.read.rating); i++) {
                    document.getElementById(book.name + "_star_" + i).src = "/star_active.png";
                }
                for (let i = parseInt(book.read.rating); i < 5 - parseInt(book.read.rating); i++) {
                    document.getElementById(book.name + "_star_" + i).src = "/star.png";
                }
            }} onClick={() => {
                changeState(book.read.flag, "READ", book.id, setState, setNotificationActive, setNotificationMessage, type, (index + 1).toString());
            }} className={"star"} src={index < parseInt(book.read.rating) ? "/star_active.png" : "/star.png"} id={book.name + "_star_" + index}/>)}
        </div>
    );
}

export default Rating;