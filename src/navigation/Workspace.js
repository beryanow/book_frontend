import React from "react";
import Cover from "../book/Cover";

function Workspace({ books, setDescriptionActive, setSelectionBook, setAddBookActive, setRemoveBookActive, setCurrentBookId, setAddQuoteActive, addNewQuote, setAddCritiqueActive, changeState, setState, setNotificationActive, setNotificationMessage, type, quotes }) {
    function TypedArea() {
        return books ? <Cover books={books}
                              setDescriptionActive={setDescriptionActive}
                              setSelectionBook={setSelectionBook}
                              setAddBookActive={setAddBookActive}
                              setRemoveBookActive={setRemoveBookActive}
                              setCurrentBookId={setCurrentBookId}
                              setAddQuoteActive={setAddQuoteActive}
                              addNewQuote={addNewQuote}
                              setAddCritiqueActive={setAddCritiqueActive}
                              changeState={changeState}
                              setState={setState}
                              setNotificationActive={setNotificationActive}
                              setNotificationMessage={setNotificationMessage}
                              type={type}/> : null

    }

    return (
        <div className={"workspace"}>
            {TypedArea()}
        </div>
    );
}

export default Workspace;