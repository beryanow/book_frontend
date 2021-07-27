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
import CreateQuote from "./option/CreateQuote";
import CreateCritique from "./option/CreateCritique";

const FadeIn = styled.div`animation: 800ms ${keyframes`${fadeIn}`} ease-in-out`

function fetchAllBooksData(setState) {
    const getAllBooksUrl = 'http://localhost:8080/book/get-all';

    axios.post(getAllBooksUrl).then((books) => {
        const booksFound = books.data;
        books.data.forEach(book => {
           downloadImage(book.name);
        });

        setState({ books: booksFound });
    });
}

function addNewBook(newBookState) {
    const addNewBookUrl = 'http://localhost:8080/book/add';
    axios.post(addNewBookUrl, newBookState).then(() => {
        window.location.reload();
    });
}

function removeBook(currentBookIdState) {
    const removeBookUrl = 'http://localhost:8080/book/remove';
    axios.post(removeBookUrl, currentBookIdState).then(() => {
        window.location.reload();
    });
}

function addNewQuote(newQuoteState) {
    const addNewQuoteUrl = 'http://localhost:8080/quote/add';
    axios.post(addNewQuoteUrl, newQuoteState).then(() => {
        window.location.reload();
    });
}

function addNewCritique(newCritiqueState) {
    const addNewCritiqueUrl = 'http://localhost:8080/critique/add';
    axios.post(addNewCritiqueUrl, newCritiqueState).then(() => {
        window.location.reload();
    });
}

function changeState(flag, option, bookId) {
    const changeStateUrl = 'http://localhost:8080/state/change';
    axios.post(changeStateUrl, {flag, option, bookId}).then(() => {
        window.location.reload();
    });
}

function downloadImage(imageName) {
    let imageBackgroundName = imageName + '_background';

    if (localStorage.getItem(imageBackgroundName) === null) {
        const addNewCritiqueUrl = 'http://localhost:8080/file/download/' + imageName + '.png';
        axios.get(addNewCritiqueUrl, {
            responseType: 'arraybuffer'
        }).then((result) => {
            localStorage.setItem(imageBackgroundName, Buffer.from(result.data, 'binary').toString('base64'));
            console.log("Скачано изображение: " + imageName + ".png")
        });
    }
}

function uploadImage(image, name) {
    const formData = new FormData();
    const blob = image.slice(0, image.size, 'image/png');
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
    const [addCritiqueActive, setAddCritiqueActive] = useState(false);
    const [selectionBook, setSelectionBook] = useState({});
    const [currentBookId, setCurrentBookId] = useState("");

    downloadImage("Собор");

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
                    <CreateQuote addNewQuote={addNewQuote}
                                 currentBookId={currentBookId}/>
                </ActionForm>

                {/* Окно добавления рецензии для книги */}
                <ActionForm active={addCritiqueActive}
                            setActive={setAddCritiqueActive}
                            formType={"addCritiqueForm"}>
                    <CreateCritique addNewCritique={addNewCritique}
                                 currentBookId={currentBookId}/>
                </ActionForm>

                <Sidebar/>
                <Workspace books={state.books}
                           setDescriptionActive={setDescriptionActive}
                           setSelectionBook={setSelectionBook}
                           setAddBookActive={setAddBookActive}
                           setRemoveBookActive={setRemoveBookActive}
                           setCurrentBookId={setCurrentBookId}
                           setAddQuoteActive={setAddQuoteActive}
                           addNewQuote={addNewQuote}
                           setAddCritiqueActive={setAddCritiqueActive}
                           changeState={changeState}/>
            </FadeIn>
        </Suspense>
    );
}

export default App;
