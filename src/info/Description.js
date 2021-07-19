import React from "react";
import './styles/Description.css'

function Description({active, setActive, children}) {
    return (
        <div className={active ? "description active" : "description"} onClick={() => setActive(false)}>
            <div className={active ? "descriptionContent active" : "descriptionContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Description;