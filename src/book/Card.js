import React, { useEffect, useState } from 'react'
import './styles/Book.css'
import ActionBar from "./ActionBar";
import localforage from "localforage";
import Rating from "./Rating";
import ReadDate from "./ReadDate";

async function getItemFromLocalforage(type, book, setBackground) {
    const item = await localforage.getItem(book.name !== undefined ? book.name + type : null);
    setBackground(item);
}

function Card({ book, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type }) {
    const [background, setBackground] = useState("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAXJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDctMzFUMDA6MjU6MzYrMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTlkMWMzOC02OGUwLTQ3ZjctYWJmNS0wNTljOGNiZjg4OTQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxOWQxYzM4LTY4ZTAtNDdmNy1hYmY1LTA1OWM4Y2JmODg5NCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyMDo0OSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZmIyOGVlLTU2YmYtNDQ3NS05OTgyLWExYmQ3YjU1ODI1OCIgc3RFdnQ6d2hlbj0iMjAyMS0wNy0zMVQwMDoyNTozNiswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YuVNWQAAAAxJREFUCJljePjwIQAFSgKksh+ffAAAAABJRU5ErkJggg==");

    getItemFromLocalforage("_background", book, setBackground);

    const backgroundUrl = 'url(data:image/png;base64,' + background + ')';

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
        }
        img.src = 'http://5.101.50.241:8080/file/download/' + book.name + '.png';
    }, [book.name]);

    return (
        <div className={"cover"}>
            <div className={"card transition"}
                 style={{ backgroundImage: backgroundUrl }}
                 onClick={() => {
                     setDescriptionActive(true);
                     setSelectionBook(book);
                 }}>

                <div className={"title"}>{book.name}</div>
                <div className={"author"}>{book.author}</div>
                <div className={"removeLabel transition"} onClick={e => {
                    e.stopPropagation();
                    setCurrentBookId(book.id);
                }}>
                    <img className={"imgQuote transition"} onClick={() => setRemoveBookActive(true)} src={"/removeLabel.png"}/>
                </div>

                {book.read.flag ? book.read.rating !== null ? <Rating book={book}
                                                                      changeState={changeState}
                                                                      setState={setState}
                                                                      setNotificationActive={setNotificationActive}
                                                                      setNotificationMessage={setNotificationMessage}
                                                                      type={type}/>
                    : <div className={"rating"}/> : null}

                {book.read.flag ? book.read.createdDate !== null ? <ReadDate className={"date"} date={book.read.createdDate}/>
                    : <div className={"rating"}/> : null}

                <ActionBar setAddQuoteActive={setAddQuoteActive}
                           setAddCritiqueActive={setAddCritiqueActive}
                           bookId={book.id}
                           addNewQuote={addNewQuote}
                           setCurrentBookId={setCurrentBookId}
                           isBookRead={book.read.flag}
                           isBookReading={book.reading.flag}
                           isBookToRead={book.toRead.flag}
                           isBookFavourite={book.favourite.flag}
                           changeState={changeState}
                           setState={setState}
                           setNotificationActive={setNotificationActive}
                           setNotificationMessage={setNotificationMessage}
                           type={type}/>
            </div>
        </div>
    );
}

export default Card;