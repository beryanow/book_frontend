import React from "react";
import InfoTitle from "../info/InfoTitle";
import './styles/CreateQuote.css'

function CreateQuote({ addNewQuote, currentBookId, setState, setAddQuoteActive, setNotificationActive, setNotificationMessage }) {
    return (
        <div>
            <InfoTitle className={"optionTitle"} name={'Новая цитата'}/>
            <InfoTitle className={"bookField"} name={'Требуется ввод'}/>
            <textarea className={"quoteArea"} id={"addQuoteField"}/>
            {window.onload = function () {
                const tx = document.getElementById('addQuoteField');
                tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
                tx.addEventListener("input", OnInput, false);

                function OnInput() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                }
            }}
            <div className={"addBookButton transition"} onClick={() => {
                const quote = document.getElementById('addQuoteField').value;
                addNewQuote({content: quote, bookId: currentBookId}, setState, setAddQuoteActive, setNotificationActive, setNotificationMessage);
            }}>Добавить цитату</div>
        </div>
    );
}

export default CreateQuote;
