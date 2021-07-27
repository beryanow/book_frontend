import React from "react";

function Selection({ buttonImage, name }) {
    return (
        <table>
            <tbody>
            <tr className={"selection transition"}>
                <td className={"selectionElement"}>
                    <div>
                        <img src={buttonImage}/>
                        <div>{name}</div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Selection;