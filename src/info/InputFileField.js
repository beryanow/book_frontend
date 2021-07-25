import React from "react";

function InputFileField({ id }) {
    return (
        <div className={"file-upload"}>
            <input id={id} type="file"/>
        </div>
    );
}

export default InputFileField;