import React from "react";
import Cover from "../book/Cover";

function Workspace({ books, setDescriptionActive, setSelectionBook }) {
    return (
        <div className={"workspace"}>
            {books ? <Cover books={books}
                            setDescriptionActive={setDescriptionActive}
                            setSelectionBook={setSelectionBook}/> : null}
        </div>
    );
}

export default Workspace;