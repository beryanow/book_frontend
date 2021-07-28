import React from "react";
import Title from "./Title";
import NewCard from "./NewCard";

const ReactLazyPreload = importStatement => {
    const Component = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

const Card = ReactLazyPreload(() =>
    import("./Card")
);

function Cover({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type }) {
    let title;
    switch (type) {
        case "shelf":
            title = "Книжная полка";
            break;
        case "to-read":
            title = "Желанные книги";
            break;
    }

    return (
        <div>
            <Title name={title}/>
            <div className={"cover"}>
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
        </div>
    );
}

export default Cover;