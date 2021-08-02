import React from "react";
import InfoTitle from "./InfoTitle";

function EditCritique({ currentCritiqueId, selectionBook, editCritique, setState, setEditCritiqueActive, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Изменение рецензии'}/>
            <InfoTitle className={"bookField"} name={'Требуется ввод'}/>
            <textarea className={"quoteArea"} id={"editCritiqueField"}/>
            {window.onload = function () {
                const tx = document.getElementById('editCritiqueField');
                tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
                tx.addEventListener("input", OnInput, false);

                function OnInput() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                }
            }}
            <div className={"addBookButton transition"} onClick={() => {
                const critique = document.getElementById('editCritiqueField').value;
                editCritique({id: currentCritiqueId, bookId: selectionBook.id, content: critique}, setState, setEditCritiqueActive, setNotificationActive, setNotificationMessage, type);
            }}>Изменить рецензию
            </div>
        </div>
    );
}

export default EditCritique;