import React, { Suspense, useEffect, useState } from "react";
import axios from 'axios'
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
import NotificationForm from "./info/NotificationForm";

const notificationMessageSeconds = 1500;

const FadeIn = styled.div`animation: 800ms ${keyframes`${fadeIn}`} ease-in-out`

function updateBooks(setState) {
    fetchAllBooksData(setState);
}

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

function addNewBook(newBookState, setState, setAddBookActive, setNotificationActive, setNotificationMessage) {
    const addNewBookUrl = 'http://localhost:8080/book/add';
    axios.post(addNewBookUrl, newBookState).then(() => {
        updateBooks(setState);
        setAddBookActive(false);
        setNotificationActive(true);
        setNotificationMessage("Книга успешно добавлена");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setAddBookActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось добавить книгу");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function removeBook(currentBookIdState, setState, setRemoveBookActive, setNotificationActive, setNotificationMessage) {
    const removeBookUrl = 'http://localhost:8080/book/remove';
    axios.post(removeBookUrl, currentBookIdState).then(() => {
        updateBooks(setState);
        setRemoveBookActive(false);
        setNotificationActive(true);
        setNotificationMessage("Книга успешно удалена");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setRemoveBookActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось удалить книгу");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function addNewQuote(newQuoteState, setState, setAddQuoteActive, setNotificationActive, setNotificationMessage) {
    const addNewQuoteUrl = 'http://localhost:8080/quote/add';
    axios.post(addNewQuoteUrl, newQuoteState).then(() => {
        updateBooks(setState);
        setAddQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Цитата добавлена успешно");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setAddQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось добавить цитату");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function addNewCritique(newCritiqueState, setState, setAddCritiqueActive, setNotificationActive, setNotificationMessage) {
    const addNewCritiqueUrl = 'http://localhost:8080/critique/add';
    axios.post(addNewCritiqueUrl, newCritiqueState).then(() => {
        updateBooks(setState);
        setAddCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Рецензия добавлена успешно");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setAddCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось добавить рецензию");
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function changeState(flag, option, bookId, setState, setNotificationActive, setNotificationMessage) {
    const changeStateUrl = 'http://localhost:8080/state/change';
    axios.post(changeStateUrl, {flag, option, bookId}).then(() => {
        updateBooks(setState);

        let notificationMessage;
        switch (option) {
            case "FAVOURITE":
                if (flag) {
                    notificationMessage = "Книга добавлена в избранное";
                } else {
                    notificationMessage = "Книга удалена из избранного";
                }
                break;
            case "READ":
                if (flag) {
                    notificationMessage = "Книга добавлена в прочитанное";
                } else {
                    notificationMessage = "Книга удалена из прочитанного";
                }
                break;
            case "READING":
                if (flag) {
                    notificationMessage = "Книга добавлена в текущее";
                } else {
                    notificationMessage = "Книга удалена из текущего";
                }
                break;
            case "TO_READ":
                if (flag) {
                    notificationMessage = "Книга добавлена в желанное";
                } else {
                    notificationMessage = "Книга удалена из желанного";
                }
                break;
        }

        setNotificationActive(true);
        setNotificationMessage(notificationMessage);
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        let notificationMessage;
        switch (option) {
            case "FAVOURITE":
                notificationMessage = "Не удалось добавить книгу в избранное";
                break;
            case "READ":
                notificationMessage = "Не удалось добавить книгу в прочитанное";
                break;
            case "READING":
                notificationMessage = "Не удалось добавить книгу в текущее";
                break;
            case "TO_READ":
                notificationMessage = "Не удалось добавить книгу в желанное";
                break;
        }

        setNotificationActive(true);
        setNotificationMessage(notificationMessage);
        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
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

    axios.post(uploadImageUrl, formData).then(() => {
        console.log("Загружен файл " + name);
    });
}

function App() {
    const [state, setState] = useState({ books: [] });
    const [notificationActive, setNotificationActive] = useState(false);
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [addBookActive, setAddBookActive] = useState(false);
    const [removeBookActive, setRemoveBookActive] = useState(false);
    const [addQuoteActive, setAddQuoteActive] = useState(false);
    const [addCritiqueActive, setAddCritiqueActive] = useState(false);
    const [selectionBook, setSelectionBook] = useState({});
    const [currentBookId, setCurrentBookId] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    downloadImage("Собор");

    useEffect(() => {
        fetchAllBooksData(setState);
    }, [setState]);

    {{console.log("render")}}
    return (
        <Suspense fallback={<div/>}>
            <FadeIn>
                {/* Окно событий */}
                <NotificationForm active={notificationActive}
                                  formType={"notificationForm"}>
                   <h1>{notificationMessage}</h1>
                </NotificationForm>

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
                             uploadImage={uploadImage}
                             setState={setState}
                             setAddBookActive={setAddBookActive}
                             setNotificationActive={setNotificationActive}
                             setNotificationMessage={setNotificationMessage}/>
                </ActionForm>

                {/* Окно удаления книги */}
                <ActionForm active={removeBookActive}
                            setActive={setRemoveBookActive}
                            formType={"removeBookForm"}>
                    <RemoveBook currentBookId={currentBookId}
                                removeBook={removeBook}
                                setState={setState}
                                setRemoveBookActive={setRemoveBookActive}
                                setNotificationActive={setNotificationActive}
                                setNotificationMessage={setNotificationMessage}/>
                </ActionForm>

                {/* Окно добавления цитаты для книги */}
                <ActionForm active={addQuoteActive}
                            setActive={setAddQuoteActive}
                            formType={"addQuoteForm"}>
                    <CreateQuote addNewQuote={addNewQuote}
                                 currentBookId={currentBookId}
                                 setState={setState}
                                 setAddQuoteActive={setAddQuoteActive}
                                 setNotificationActive={setNotificationActive}
                                 setNotificationMessage={setNotificationMessage}/>
                </ActionForm>

                {/* Окно добавления рецензии для книги */}
                <ActionForm active={addCritiqueActive}
                            setActive={setAddCritiqueActive}
                            formType={"addCritiqueForm"}>
                    <CreateCritique addNewCritique={addNewCritique}
                                    currentBookId={currentBookId}
                                    setState={setState}
                                    setAddCritiqueActive={setAddCritiqueActive}
                                    setNotificationActive={setNotificationActive}
                                    setNotificationMessage={setNotificationMessage}/>
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
                           changeState={changeState}
                           setState={setState}
                           setNotificationActive={setNotificationActive}
                           setNotificationMessage={setNotificationMessage}/>
            </FadeIn>
        </Suspense>
    );
}

export default App;
