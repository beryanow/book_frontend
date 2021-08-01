import React, {useState} from "react";

function Selection({buttonImage, activeButtonImage, name, active, fetchRelevantBooksAmount, type}) {
    const [amount, setAmount] = useState("");

    fetchRelevantBooksAmount(type).then((books) => {
        if (type === "author") {
            setAmount(Object.keys(books.data).length);
            return;
        } else if (type === "quote") {
            let quotesAmount = 0;
            books.data.forEach(book => quotesAmount += book.quotes.length);

            setAmount(quotesAmount);
            return;
        }

        setAmount(books.data.length);
    });

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
                    <div style={{width: "200px", marginLeft: "-4px", marginTop: "-2px"}}>
                        <img className={amount !== "" ? "counterVisible" : "counterInvisible"} style={{marginLeft: "-10px"}} src={active ? activeButtonImage : buttonImage}/>
                        <div className={amount !== "" ? "counterVisible" : "counterInvisible"} style={{width: "110px", display: "inline-flex", verticalAlign: "middle", marginTop: "1px", marginBottom: "9px"}}>{name}</div>
                        <div className={amount !== "" ? "counterVisible" : "counterInvisible"} style={{display: "inline-flex", textAlign: "center", backgroundColor: active ? "#fafafa" : "#979797", borderRadius: "20px", width: "10px", height: "10px", marginTop: "3px", marginLeft: "6px", justifyContent: "center", paddingLeft: "7px", paddingTop: "4px", fontSize: "11px", color: active ? "#32080e" : "white", paddingRight: "7px", paddingBottom: "8px", whiteSpace: "nowrap"}}>{amount !== 0 ? amount : "0"}</div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Selection;