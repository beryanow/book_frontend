import React from "react";
import InfoTitle from "./InfoTitle";

function RemoveQuote({ currentQuoteId, removeQuote, setState, setRemoveQuoteActive, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Удаление цитаты'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <div className={"addBookButton transition"} onClick={() => {
                removeQuote({id: currentQuoteId}, setState, setRemoveQuoteActive, setNotificationActive, setNotificationMessage, type);
            }}>Удалить цитату
            </div>
        </div>
    );
}

export default RemoveQuote;