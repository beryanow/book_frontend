import React from "react";
import Title from "./Title";
import NewCard from "./NewCard";
import QuoteCritiqueInfo from "../info/QuoteCritiqueInfo";
import User from "./User";

const ReactLazyPreload = importStatement => {
    const Component = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

const Card = ReactLazyPreload(() =>
    import("./Card")
);

function TypedZone(type, books, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, setAddBookActive, setCurrentQuoteId, setRemoveQuoteActive, setCurrentCritiqueId, setEditCritiqueActive, setEditQuoteActive, setRemoveCritiqueActive) {
    switch (type) {
        case "quote":
        case "critique":
        case "rating":
            return <div className={"ulQuote"}>
                {books.map(book => <QuoteCritiqueInfo book={book}
                                                      type={type}
                                                      changeState={changeState}
                                                      setState={setState}
                                                      setNotificationActive={setNotificationActive}
                                                      setNotificationMessage={setNotificationMessage}
                                                      setCurrentQuoteId={setCurrentQuoteId}
                                                      setRemoveQuoteActive={setRemoveQuoteActive}
                                                      setCurrentCritiqueId={setCurrentCritiqueId}
                                                      setEditCritiqueActive={setEditCritiqueActive}
                                                      setEditQuoteActive={setEditQuoteActive}
                                                      setRemoveCritiqueActive={setRemoveCritiqueActive}/>
                )}
            </div>
        case "author":
            return Object.keys(books).map(author =>
                <div>
                    <Title name={author}/>
                    <div className={"ulQuote"}>
                        {books[author].map(book => <QuoteCritiqueInfo book={book}
                                                                      type={type}
                                                                      changeState={changeState}
                                                                      setState={setState}
                                                                      setNotificationActive={setNotificationActive}
                                                                      setNotificationMessage={setNotificationMessage}
                                                                      setCurrentQuoteId={setCurrentQuoteId}
                                                                      setRemoveQuoteActive={setRemoveQuoteActive}
                                                                      setCurrentCritiqueId={setCurrentCritiqueId}
                                                                      setEditCritiqueActive={setEditCritiqueActive}
                                                                      setEditQuoteActive={setEditQuoteActive}
                                                                      setRemoveCritiqueActive={setRemoveCritiqueActive}/>
                        )}
                    </div>
                </div>
            );
        case "book":
            return <div className={"ulQuote"}>
                {books.map(book => <QuoteCritiqueInfo book={book}
                                                      type={type}
                                                      changeState={changeState}
                                                      setState={setState}
                                                      setNotificationActive={setNotificationActive}
                                                      setNotificationMessage={setNotificationMessage}
                                                      setCurrentQuoteId={setCurrentQuoteId}
                                                      setRemoveQuoteActive={setRemoveQuoteActive}
                                                      setCurrentCritiqueId={setCurrentCritiqueId}
                                                      setEditCritiqueActive={setEditCritiqueActive}
                                                      setEditQuoteActive={setEditQuoteActive}
                                                      setRemoveCritiqueActive={setRemoveCritiqueActive}/>
                )}
            </div>
        default:
            return <div className={"cover"}>
                {books.map(book => <Card key={book.id}
                                         book={book}
                                         setDescriptionActive={setDescriptionActive}
                                         setSelectionBook={setSelectionBook}
                                         setRemoveBookActive={setRemoveBookActive}
                                         setCurrentBookId={setCurrentBookId}
                                         setAddQuoteActive={setAddQuoteActive}
                                         addNewQuote={addNewQuote}
                                         setAddCritiqueActive={setAddCritiqueActive}
                                         changeState={changeState}
                                         setState={setState}
                                         setNotificationActive={setNotificationActive}
                                         setNotificationMessage={setNotificationMessage}
                                         type={type}/>
                )}
                <NewCard setAddBookActive={setAddBookActive}/>
            </div>
    }
}
function Cover({books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type, setCurrentQuoteId, setRemoveQuoteActive, setCurrentCritiqueId, setEditCritiqueActive, setEditQuoteActive, setRemoveCritiqueActive}) {
    let title = "?????????????? ??????????";
    switch (type) {
        case "read":
            title = "?????????????????????? ??????????";
            break;
        case "reading":
            title = "?????????????? ??????????";
            break;
        case "to-read":
            title = "???????????????? ??????????";
            break;
        case "favourite":
            title = "?????????????????? ??????????";
            break;
        case "quote":
            title = "???????????? ???? ????????";
            break;
        case "rating":
            title = "???????????? ????????";
            break;
        case "critique":
            title = "???????????????? ???? ??????????";
            break;
        case "author":
            title = "???????????? ????????";
            break;
    }

    return (
        <div>
            <div style={{width: "100%", display: "inline-flex"}}>
                <Title name={title}/>
                <User name={"???????????? ????????????????"}/>
                <img src={"/user.jpg"} width={"45px"} height={"45px"} style={{marginTop: "30px", marginRight: "20px", borderRadius: "40px"}}/>
            </div>

            {TypedZone(type, books, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, setAddBookActive, setCurrentQuoteId, setRemoveQuoteActive, setCurrentCritiqueId, setEditCritiqueActive, setEditQuoteActive, setRemoveCritiqueActive)}
        </div>
    );
}

export default Cover;