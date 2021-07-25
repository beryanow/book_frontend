import React, { useEffect, useState } from "react";
import InfoTitle from "./InfoTitle";
import QuoteField from "./QuoteField";
import QuotePaginationIndicatorsField from "./QuotePaginationIndicatorsField";

function DetailedInfo({ selectionBook }) {
    const quotesPerPageAmount = 2;
    const quotesLength = selectionBook.quotes !== undefined ? selectionBook.quotes.length : 0;
    const quoteIndicatorsAmount = Math.ceil(quotesLength / quotesPerPageAmount);

    const [pagedQuotes, setPagedQuotes] = useState([]);
    const [currentIndicator, setCurrentIndicator] = useState(0);

    const updatePartedQuotesArray = (currentIndex) => {
        if (selectionBook.quotes !== undefined) {
            const partedQuotesArray = [];

            for (let i = currentIndex * quotesPerPageAmount; i < (currentIndex + 1) * quotesPerPageAmount; i++) {
                if (i < quotesLength) {
                    partedQuotesArray.push(selectionBook.quotes[i]);
                }
            }

            setPagedQuotes(partedQuotesArray);
            console.log(partedQuotesArray)
        }
    }

    useEffect(() => {
        if (selectionBook.quotes !== undefined) {
            updatePartedQuotesArray(currentIndicator);
        }
    }, [quotesLength, selectionBook.quotes]);

    return (
        <div>
            <InfoTitle className={"infoTitle"} name={selectionBook.name}/>
            <InfoTitle className={"infoAuthor"} name={selectionBook.author}/>

            <InfoTitle className={"quoteTitle"} name={"Цитаты"}/>

            {pagedQuotes !== undefined ?
                pagedQuotes.map(quote =>
                    <QuoteField content={quote.content}/>)
                : null
            }

            <QuotePaginationIndicatorsField currentIndicator={currentIndicator}
                                            quoteIndicatorsAmount={quoteIndicatorsAmount}
                                            setCurrentIndicator={setCurrentIndicator}
                                            updatePartedQuotesArray={updatePartedQuotesArray}/>
        </div>
    );
}

export default DetailedInfo;