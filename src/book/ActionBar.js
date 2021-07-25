import React from "react";

function ActionBar({ setAddQuoteActive }) {
    return (
        <div className={"actionBar transition"} onClick={e => e.stopPropagation()}>
            <img src={"/quoteOption.png"} className={"img transition"} onClick={() => {
                setAddQuoteActive(true);
            }}/>
            <img src={"/assessmentOption.png"} className={"img transition"}/>
            <img src={"/reviewOption.png"} className={"img transition"}/>
            <img src={"/delimiter.png"} className={"img transition"}/>
            <img src={"/desireOption.png"} className={"img transition"}/>
            <img src={"/readOption.png"} className={"img transition"}/>
            <img src={"/toReadOption.png"} className={"img transition"}/>
        </div>
    )
}

export default ActionBar;