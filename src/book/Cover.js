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

function Cover({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState }) {
    return (
        <div>
            <Title name={"Книжная полка"}/>
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
                                         changeState={changeState}/>
                )}
                <NewCard setAddBookActive={setAddBookActive}/>
            </div>
        </div>
    );
}

export default Cover;