import React, { useEffect, useState } from "react";
import InfoTitle from "./InfoTitle";
import CardElementField from "./CardElementField";
import ReadDate from "../book/ReadDate";
import QuotePaginationIndicatorsField from "./QuotePaginationIndicatorsField";
import localforage from "localforage";

async function getItemFromLocalforage(type, book, setBackground) {
    const item = await localforage.getItem(book.name !== undefined ? book.name + type : null);
    setBackground(item);
}

function DetailedInfo({ setDescriptionActive, selectionBook, setEditQuoteActive, setEditCritiqueActive, setRemoveCritiqueActive, setCurrentCritiqueId, setRemoveQuoteActive, setCurrentQuoteId }) {
    const quotesPerPageAmount = 2;
    const quotesLength = selectionBook.quotes !== undefined ? selectionBook.quotes.length : 0;
    const quoteIndicatorsAmount = Math.ceil(quotesLength / quotesPerPageAmount);

    const [background, setBackground] = useState("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAXJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDctMzFUMDA6MjU6MzYrMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxOWQxYzM4LTY4ZTAtNDdmNy1hYmY1LTA1OWM4Y2JmODg5NCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YuVNWQAAAAxJREFUCJljePjwIQAFSgKksh+ffAAAAABJRU5ErkJggg==");
    const [blurBackground, setBlurBackground] = useState("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAXJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDctMzFUMDA6MjU6MzYrMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxOWQxYzM4LTY4ZTAtNDdmNy1hYmY1LTA1OWM4Y2JmODg5NCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YuVNWQAAAAxJREFUCJljePjwIQAFSgKksh+ffAAAAABJRU5ErkJggg==");

    const critique = selectionBook.critique !== undefined ? selectionBook.critique : null;

    const [pagedQuotes, setPagedQuotes] = useState([]);
    const [currentIndicator, setCurrentIndicator] = useState(0);

    getItemFromLocalforage("_background", selectionBook, setBackground);
    getItemFromLocalforage("_blur_background", selectionBook, setBlurBackground);

    const base64Background = 'data:image/jpeg;base64,' + background;
    const blurBackgroundUrl = 'url(data:image/png;base64,' + blurBackground + ')';

    const updatePartedQuotesArray = (currentIndex) => {
        if (selectionBook.quotes !== undefined) {
            const partedQuotesArray = [];

            for (let i = currentIndex * quotesPerPageAmount; i < (currentIndex + 1) * quotesPerPageAmount; i++) {
                if (i < quotesLength) {
                    partedQuotesArray.push(selectionBook.quotes[i]);
                }
            }

            setPagedQuotes(partedQuotesArray);
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

            {critique === null ? critique : <InfoTitle className={"cardElementTitle"} name={"Рецензия"}/>}

            {critique !== null ?
                <div className={"quoteCover"}
                     style={{backgroundImage: blurBackgroundUrl}}>
                    <CardElementField content={critique.content}
                                      className={"critique"}/>
                    <div style={{display: "flex", marginTop: "10px"}}>
                        <div className={"removeLabelQuote transition"}>
                            <img className={"imgQuote transition"} src={"/editLabel.png"}
                                 onClick={() => {
                                     setCurrentCritiqueId(critique.id);
                                     setEditCritiqueActive(true);
                                     setDescriptionActive(false);
                                 }}/>
                            <img className={"imgQuote transition"} src={"/removeLabelDarker.png"}
                                 onClick={() => {
                                     setCurrentCritiqueId(critique.id);
                                     setRemoveCritiqueActive(true);
                                     setDescriptionActive(false);
                                 }}/>
                        </div>
                        <ReadDate date={critique.lastUpdatedDate}
                                  className={"dateInfo"}/>
                    </div>
                </div> : null
            }

            {pagedQuotes === undefined || pagedQuotes.length === 0 ? null : <InfoTitle className={"cardElementTitle"} name={"Цитаты"}/>}

            {pagedQuotes !== undefined && pagedQuotes.length !== 0 ?
                <div className={"quoteCover"}
                     style={{backgroundImage: blurBackgroundUrl, paddingTop: "15px"}}>
                    {pagedQuotes.map(quote =>
                        <div>
                            <div><CardElementField key={quote.id}
                                                   content={quote.content}
                                                   className={"quote"}/>
                            </div>
                            <div style={{display: "flex", marginTop: "10px"}}>
                                <div className={"removeLabelQuote transition"}>
                                    <img className={"imgQuote transition"} src={"/editLabel.png"}
                                         onClick={() => {
                                             setCurrentQuoteId(quote.id);
                                             setEditQuoteActive(true);
                                             setDescriptionActive(false);
                                         }}/>
                                    <img className={"imgQuote transition"} src={"/removeLabelDarker.png"}
                                         onClick={() => {
                                             setCurrentQuoteId(quote.id);
                                             setRemoveQuoteActive(true);
                                             setDescriptionActive(false);
                                         }}/>
                                </div>
                                <ReadDate date={quote.lastUpdatedDate}
                                          className={"dateInfo"}/>
                            </div>
                        </div>)}

                    <div>
                    <QuotePaginationIndicatorsField currentIndicator={currentIndicator}
                                                    quoteIndicatorsAmount={quoteIndicatorsAmount}
                                                    setCurrentIndicator={setCurrentIndicator}
                                                    updatePartedQuotesArray={updatePartedQuotesArray}/>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default DetailedInfo;