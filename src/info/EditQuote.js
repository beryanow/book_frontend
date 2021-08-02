import React from "react";
import InfoTitle from "./InfoTitle";

function EditQuote({ currentQuoteId, selectionBook, setState, editQuote, setEditQuoteActive, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Изменение цитаты'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <textarea className={"quoteArea"} id={"editQuoteField"}/>
            {window.onload = function () {
                const tx = document.getElementById('editQuoteField');
                tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
                tx.addEventListener("input", OnInput, false);

                function OnInput() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                }
            }}
            <div className={"addBookButton transition"} onClick={() => {
                const quote = document.getElementById('editQuoteField').value;
                editQuote({id: currentQuoteId, bookId: selectionBook.id, content: quote}, setState, setEditQuoteActive, setNotificationActive, setNotificationMessage, type);
            }}>Изменить цитату
            </div>
        </div>
    );
}

export default EditQuote;