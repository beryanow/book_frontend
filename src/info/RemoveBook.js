import React from "react";
import InfoTitle from "./InfoTitle";

function RemoveBook({ currentBookId, removeBook, setState, setRemoveBookActive}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Удаление книги'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <div className={"addBookButton transition"} onClick={() => {
                removeBook({id: currentBookId}, setState);
                setRemoveBookActive(false);
            }}>Удалить книгу
            </div>
        </div>
    );
}

export default RemoveBook;