import React from "react";

function Selection({buttonImage, name, active}) {
    return (
        <table>
            <tbody>
            <tr onMouseEnter={() => {
                document.getElementById(name).style.transition = '200ms';
                document.getElementById(name).style.filter = 'brightness(0.8)';
            }} onMouseLeave={() => {
                document.getElementById(name).style.transition = '200ms';
                document.getElementById(name).style.filter = 'brightness(1)';
            }} id={name} className={active ? "selectionActive" : "selection" + " transition"}>
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