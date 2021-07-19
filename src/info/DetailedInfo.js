import React from "react";
import InfoTitle from "./InfoTitle";
import QuoteField from "./QuoteField";

function DetailedInfo({ selectionBook }) {
    return (
        <div>
            <InfoTitle className={"infoTitle"} name={selectionBook.name}/>
            <InfoTitle className={"infoAuthor"} name={selectionBook.author}/>
            {selectionBook.quotes !== undefined ?
                selectionBook.quotes.map(quote =>
                    <QuoteField content={quote.content}/>)
                : null
            }
        </div>
    );
}

export default DetailedInfo;