import React, { Suspense, useEffect, useState } from "react";
import axios from 'axios'
import Cover from "./book/Cover";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./navigation/Sidebar";
import Workspace from "./navigation/Workspace";
import Description from "./info/Description";
import DetailedInfo from "./info/DetailedInfo";

function fetchAllBooksData(setState) {
    const getAllBooksUrl = 'http://localhost:8080/book/get-all';

    axios.post(getAllBooksUrl).then((books) => {
        const booksFound = books.data;
        setState({ books: booksFound });
    });
}

function App() {
    const [state, setState] = useState({ books: [] });
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [selectionBook, setSelectionBook] = useState({});

    useEffect(() => {
        fetchAllBooksData(setState);
    }, [setState]);

    {{console.log("render")}}
    return (
        <Suspense fallback={<div>h1</div>}>
            <Description active={descriptionActive}
                         setActive={setDescriptionActive}>
                <DetailedInfo selectionBook={selectionBook}/>
            </Description>
            <Sidebar/>
            <Workspace books={state.books}
                       setDescriptionActive={setDescriptionActive}
                       setSelectionBook={setSelectionBook}/>
        </Suspense>
    );
}

export default App;
