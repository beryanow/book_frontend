import React from "react";
import Cover from "../book/Cover";

function Workspace({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive }) {
    return (
        <div className={"workspace"}>
            {books ? <Cover books={books}
                            setDescriptionActive={setDescriptionActive}
                            setSelectionBook={setSelectionBook}
                            setAddBookActive={setAddBookActive}
                            setRemoveBookActive={setRemoveBookActive}
                            setCurrentBookId={setCurrentBookId}
                            setAddQuoteActive={setAddQuoteActive}/> : null}
        </div>
    );
}

export default Workspace;