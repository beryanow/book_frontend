import React, { useEffect, useState } from "react";
import InfoTitle from "./InfoTitle";
import CardElementField from "./CardElementField";
import QuotePaginationIndicatorsField from "./QuotePaginationIndicatorsField";

function DetailedInfo({ selectionBook }) {
    const quotesPerPageAmount = 2;
    const quotesLength = selectionBook.quotes !== undefined ? selectionBook.quotes.length : 0;
    const quoteIndicatorsAmount = Math.ceil(quotesLength / quotesPerPageAmount);

    const critique = selectionBook.critique !== undefined ? selectionBook.critique : null;

    const [pagedQuotes, setPagedQuotes] = useState([]);
    const [currentIndicator, setCurrentIndicator] = useState(0);

    const background = localStorage.getItem(selectionBook.name !== undefined ? selectionBook.name + "_background" : null);
    const base64Background = 'data:image/jpeg;base64,' + background;

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
            <div className={"cardTitleArea"}>
                <div className={"cardTitleImagePart"}>
                    <img src={base64Background}
                         width={'55px'}
                         height={'55px'}
                         className={"cardTitleImageContents"}/>
                </div>
                <div className={"cardTitleTextPart"}>
                    <InfoTitle className={"infoTitle"} name={selectionBook.name}/>
                    <InfoTitle className={"infoAuthor"} name={selectionBook.author}/>
                </div>
            </div>

            {critique === null ?
                <InfoTitle className={"alertTitle"} name={"Рецензия для выбранной книги не найдена"}/>
                : <InfoTitle className={"cardElementTitle"} name={"Рецензия"}/>
            }

            {critique !== null ?
                <CardElementField content={critique.content}
                                  className={"critique"}/>
                : null
            }

            {pagedQuotes === undefined || pagedQuotes.length === 0 ?
                <InfoTitle className={"alertTitle"} name={"Цитаты для выбранной книги не найдены"}/>
                : <InfoTitle className={"cardElementTitle"} name={"Цитаты"}/>
            }

            {pagedQuotes !== undefined && pagedQuotes.length !== 0 ?
                <div className={"quoteCover"}>
                    {pagedQuotes.map(quote =>
                        <CardElementField key={quote.id}
                                          content={quote.content}
                                          className={"quote"}/>)}

                    <QuotePaginationIndicatorsField currentIndicator={currentIndicator}
                                                    quoteIndicatorsAmount={quoteIndicatorsAmount}
                                                    setCurrentIndicator={setCurrentIndicator}
                                                    updatePartedQuotesArray={updatePartedQuotesArray}/>
                </div>
                : null
            }
        </div>
    );
}

export default DetailedInfo;