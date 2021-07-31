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

function TypedZone(type, books, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, setAddBookActive) {
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
                                                      setNotificationMessage={setNotificationMessage}/>
                )}
            </div>;
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
function Cover({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type }) {
    let title = "Книжная полка";
    switch (type) {
        case "read":
            title = "Прочитанные книги";
            break;
        case "reading":
            title = "Текущие книги";
            break;
        case "to-read":
            title = "Желанные книги";
            break;
        case "favourite":
            title = "Избранные книги";
            break;
        case "quote":
            title = "Цитаты из книг";
            break;
        case "rating":
            title = "Оценки книг";
            break;
        case "critique":
            title = "Рецензии на книги";
            break;
        case "author":
            title = "Авторы книг";
            break;
    }

    return (
        <div>
            <div style={{width: "100%", display: "inline-flex"}}>
                <Title name={title}/>
                <User name={"Максим Берьянов"}/>
                <img src={"/user.jpg"} width={"45px"} height={"45px"} style={{marginTop: "30px", marginRight: "20px", borderRadius: "40px"}}/>
            </div>

            {TypedZone(type, books, setDescriptionActive, setSelectionBook, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, setAddBookActive)}
        </div>
    );
}

export default Cover;