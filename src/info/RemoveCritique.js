import React from "react";
import InfoTitle from "./InfoTitle";

function RemoveCritique({ currentCritiqueId, removeCritique, setState, setRemoveCritiqueActive, setNotificationActive, setNotificationMessage, type}) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={'Удаление рецензии'}/>
            <InfoTitle className={"bookField"} name={'Требуется подтверждение'}/>
            <div className={"addBookButton transition"} onClick={() => {
                removeCritique({id: currentCritiqueId}, setState, setRemoveCritiqueActive, setNotificationActive, setNotificationMessage, type);
            }}>Удалить рецензию
            </div>
        </div>
    );
}

export default RemoveCritique;