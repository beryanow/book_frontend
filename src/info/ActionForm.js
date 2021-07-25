import React from "react";
import './styles/ActionForm.css'

function ActionForm({active, setActive, children, formType}) {
    return (
        <div className={active ? "description active" : "description"} onClick={() => setActive(false)}>
            <div className={active ? "descriptionContent active " + formType : "descriptionContent " + formType} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default ActionForm;