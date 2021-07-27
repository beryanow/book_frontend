import InfoTitle from "../info/InfoTitle";
import React from "react";
import './styles/CreateCritique.css'

function CreateCritique({ addNewCritique, currentBookId, setState, setAddCritiqueActive, setNotificationActive, setNotificationMessage }) {
    return (
        <div>
            <InfoTitle className={"optionTitle"} name={'Новая рецензия'}/>
            <InfoTitle className={"bookField"} name={'Требуется ввод'}/>

            <textarea className={"critiqueArea"} id={"addCritiqueField"}/>

            {window.onload = function () {
                const tx = document.getElementById('addCritiqueField');
                tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
                tx.addEventListener("input", OnInput, false);

                function OnInput() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                }
            }}

            <div className={"addCritiqueButton transition"} onClick={() => {
                const critique = document.getElementById('addCritiqueField').value;
                addNewCritique({content: critique, bookId: currentBookId}, setState, setAddCritiqueActive, setNotificationActive, setNotificationMessage)
            }}>Добавить рецензию
            </div>
        </div>
    );
}

export default CreateCritique;
