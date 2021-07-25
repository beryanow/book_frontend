import React from "react";
import InfoTitle from "./InfoTitle";

function RemoveBook({ currentBookId, removeBook }) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Удаление книги'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <div className={"addBookButton transition"} onClick={() => {
                removeBook({ id: currentBookId });
            }
            }>Удалить книгу
            </div>
        </div>
    );
}

export default RemoveBook;