import React from "react";
import Cover from "../book/Cover";

function Workspace({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState }) {
    return (
        <div className={"workspace"}>
            {books ? <Cover books={books}
                            setDescriptionActive={setDescriptionActive}
                            setSelectionBook={setSelectionBook}
                            setAddBookActive={setAddBookActive}
                            setRemoveBookActive={setRemoveBookActive}
                            setCurrentBookId={setCurrentBookId}
                            setAddQuoteActive={setAddQuoteActive}
                            addNewQuote={addNewQuote}
                            setAddCritiqueActive={setAddCritiqueActive}
                            changeState={changeState}/> : null}
        </div>
    );
}

export default Workspace;