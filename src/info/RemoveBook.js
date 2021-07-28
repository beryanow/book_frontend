import React from "react";
import InfoTitle from "./InfoTitle";

function RemoveBook({ currentBookId, removeBook, setState, setRemoveBookActive, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Удаление книги'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <div className={"addBookButton transition"} onClick={() => {
                removeBook({id: currentBookId}, setState, setRemoveBookActive, setNotificationActive, setNotificationMessage, type);
            }}>Удалить книгу
            </div>
        </div>
    );
}

export default RemoveBook;