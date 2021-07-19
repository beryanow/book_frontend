import React from "react";
import Title from "./Title";

const ReactLazyPreload = importStatement => {
    const Component = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

const Card = ReactLazyPreload(() =>
    import("./Card")
);

function Cover({ books, setDescriptionActive, setSelectionBook }) {
    return (
        <div>
            <Title name={"Книжная полка"}/>
            <div className={"cover"}>
                {books.map(book => <Card key={book.id}
                                         book={book}
                                         setDescriptionActive={setDescriptionActive}
                                         setSelectionBook={setSelectionBook}/>
                )}
            </div>
        </div>
    );
}

export default Cover;