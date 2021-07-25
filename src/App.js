import React, { Suspense, useEffect, useState } from "react";
import axios from 'axios'
import Cover from "./book/Cover";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./navigation/Sidebar";
import Workspace from "./navigation/Workspace";
import ActionForm from "./info/ActionForm";
import DetailedInfo from "./info/DetailedInfo";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import AddBook from "./info/AddBook";
import RemoveBook from "./info/RemoveBook";

const FadeIn = styled.div`animation: 800ms ${keyframes`${fadeIn}`} ease-in-out`

function fetchAllBooksData(setState) {
    const getAllBooksUrl = 'http://localhost:8080/book/get-all';

    axios.post(getAllBooksUrl).then((books) => {
        const booksFound = books.data;
        setState({ books: booksFound });
    });
}

function addNewBook(newBookState) {
    const addNewBookUrl = 'http://localhost:8080/book/add';
    axios.post(addNewBookUrl, newBookState).then(() => {
        window.location.reload();
    });
}

function removeBook(currentBookId) {
    const removeBookUrl = 'http://localhost:8080/book/remove';
    axios.post(removeBookUrl, currentBookId).then(() => {
        window.location.reload();
    });
}

function uploadImage(image, name) {
    var formData = new FormData();
    var blob = image.slice(0, image.size, 'image/png');
    formData.append("file", new File([blob], name, {type: 'image/png'}));

    const uploadImageUrl = 'http://localhost:8080/file/upload';

    axios.post(uploadImageUrl, formData).then((books) => {
        console.log("wow");
    });
}

function App() {
    const [state, setState] = useState({ books: [] });
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [addBookActive, setAddBookActive] = useState(false);
    const [removeBookActive, setRemoveBookActive] = useState(false);
    const [addQuoteActive, setAddQuoteActive] = useState(false);
    const [selectionBook, setSelectionBook] = useState({});
    const [currentBookId, setCurrentBookId] = useState("");

    useEffect(() => {
        fetchAllBooksData(setState);
    }, [setState]);

    {{console.log("render")}}
    return (
        <Suspense fallback={<div/>}>
            <FadeIn>
                {/* Окно описания книги при нажатии на карточку */}
                <ActionForm active={descriptionActive}
                            setActive={setDescriptionActive}
                            formType={"exploreBookForm"}>
                    <DetailedInfo selectionBook={selectionBook}/>
                </ActionForm>

                {/* Окно добавления новой книги */}
                <ActionForm active={addBookActive}
                            setActive={setAddBookActive}
                            formType={"addBookForm"}>
                    <AddBook addNewBook={addNewBook}
                             uploadImage={uploadImage}/>
                </ActionForm>

                {/* Окно удаления книги */}
                <ActionForm active={removeBookActive}
                            setActive={setRemoveBookActive}
                            formType={"removeBookForm"}>
                    <RemoveBook currentBookId={currentBookId}
                                removeBook={removeBook}/>
                </ActionForm>

                {/* Окно добавления цитаты для книги */}
                <ActionForm active={addQuoteActive}
                            setActive={setAddQuoteActive}
                            formType={"addQuoteForm"}>
                </ActionForm>

                <Sidebar/>
                <Workspace books={state.books}
                           setDescriptionActive={setDescriptionActive}
                           setSelectionBook={setSelectionBook}
                           setAddBookActive={setAddBookActive}
                           setRemoveBookActive={setRemoveBookActive}
                           setCurrentBookId={setCurrentBookId}
                           setAddQuoteActive={setAddQuoteActive}/>
            </FadeIn>
        </Suspense>
    );
}

export default App;
