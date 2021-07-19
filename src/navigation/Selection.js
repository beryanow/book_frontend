import React from "react";

function Selection({ buttonImage, name }) {
    return (<tr className={"selection transition"}>
        <td className={"selectionElement"}>
            <div>
                <img src={buttonImage}/>
                <div >{name}</div>
            </div>
        </td>
    </tr>);
}

export default Selection;