import React, {Suspense, useEffect, useState} from "react";
import NotificationForm from "../info/NotificationForm";
import ActionForm from "../info/ActionForm";
import DetailedInfo from "../info/DetailedInfo";
import AddBook from "../info/AddBook";
import RemoveBook from "../info/RemoveBook";
import CreateQuote from "../option/CreateQuote";
import CreateCritique from "../option/CreateCritique";
import Sidebar from "../navigation/Sidebar";
import Workspace from "../navigation/Workspace";
import styled, {keyframes} from "styled-components";
import {fadeIn} from "react-animations";
import axios from "axios";
import localforage from "localforage";
import RemoveQuote from "../info/RemoveQuote";
import RemoveCritique from "../info/RemoveCritique";
import EditCritique from "../info/EditCritique";
import EditQuote from "../info/EditQuote";

const notificationMessageSeconds = 1500;

const FadeIn = styled.div`animation: 800ms ${keyframes`${fadeIn}`} ease-in-out`

function updateBooks(setState, type) {
    fetchRelevantBooksData(setState, type);
}

async function fetchRelevantBooksAmount(type) {
    let getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all';

    switch (type) {
        case "read":
        case "rating":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-read';
            break;
        case "reading":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-reading';
            break;
        case "to-read":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-to-read';
            break;
        case "favourite":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-favourite';
            break;
        case "quote":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-quoted';
            break;
        case "critique":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-critiqued';
            break;
        case "author":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-author-grouped';
            break;
    }

    return await axios.post(getRelevantBooksUrl);
}

function fetchRelevantBooksData(setState, type) {
    let getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all';

    switch (type) {
        case "read":
        case "rating":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-read';
            break;
        case "reading":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-reading';
            break;
        case "to-read":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-to-read';
            break;
        case "favourite":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-favourite';
            break;
        case "quote":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-quoted';
            break;
        case "critique":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-critiqued';
            break;
        case "author":
            getRelevantBooksUrl = 'http://5.101.50.241:8080/book/get-all-author-grouped';
            break;
    }

    axios.post(getRelevantBooksUrl).then((books) => {
        const booksFound = books.data;

        if (type !== "author") {
            books.data.forEach(book => {
                downloadImage(book.name);
            });
        } else {
            Object.keys(books.data).forEach(author => {
                books.data[author].forEach(book => downloadImage(book.name));
            });
        }

        setState({ books: booksFound });
    });
}

function addNewBook(newBookState, setState, setAddBookActive, setNotificationActive, setNotificationMessage, type) {
    const addNewBookUrl = 'http://5.101.50.241:8080/book/add';

    axios.post(addNewBookUrl, newBookState).then(() => {
        updateBooks(setState, type);

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

    document.getElementById('bookFieldName').value = '';
    document.getElementById('bookFieldAuthor').value = '';
    document.getElementById('bookFieldImage').value = '';
}

function removeBook(currentBookIdState, setState, setRemoveBookActive, setNotificationActive, setNotificationMessage, type) {
    const removeBookUrl = 'http://5.101.50.241:8080/book/remove';

    axios.post(removeBookUrl, currentBookIdState).then(() => {
        updateBooks(setState, type);

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

function removeQuote(currentQuoteIdState, setState, setRemoveQuoteActive, setNotificationActive, setNotificationMessage, type) {
    const removeQuoteUrl = 'http://5.101.50.241:8080/quote/remove';

    axios.post(removeQuoteUrl, currentQuoteIdState).then(() => {
        updateBooks(setState, type);

        setRemoveQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Цитата успешно удалена");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setRemoveQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось удалить цитату");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function removeCritique(currentCritiqueIdState, setState, setRemoveCritiqueActive, setNotificationActive, setNotificationMessage, type) {
    const removeCritiqueUrl = 'http://5.101.50.241:8080/critique/remove';

    axios.post(removeCritiqueUrl, currentCritiqueIdState).then(() => {
        updateBooks(setState, type);

        setRemoveCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Рецензия успешно удалена");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setRemoveCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось удалить рецензию");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function editCritique(currentChangeCritiqueIdState, setState, setEditCritiqueActive, setNotificationActive, setNotificationMessage, type) {
    const editCritiqueUrl = 'http://5.101.50.241:8080/critique/edit';

    axios.post(editCritiqueUrl, currentChangeCritiqueIdState).then(() => {
        updateBooks(setState, type);

        setEditCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Рецензия успешно изменена");

        document.getElementById('editCritiqueField').value = "";

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setEditCritiqueActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось изменить рецензию");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function editQuote(currentChangeQuoteIdState, setState, setEditQuoteActive, setNotificationActive, setNotificationMessage, type) {
    const editQuoteUrl = 'http://5.101.50.241:8080/quote/edit';

    axios.post(editQuoteUrl, currentChangeQuoteIdState).then(() => {
        updateBooks(setState, type);

        setEditQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Цитата успешно изменена");

        document.getElementById('editCritiqueField').value = "";

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    }).catch(reason => {
        setEditQuoteActive(false);
        setNotificationActive(true);
        setNotificationMessage("Не удалось изменить цитату");

        setTimeout(() => {
            setNotificationActive(false);
        }, notificationMessageSeconds);
    });
}

function addNewQuote(newQuoteState, setState, setAddQuoteActive, setNotificationActive, setNotificationMessage, type) {
    const addNewQuoteUrl = 'http://5.101.50.241:8080/quote/add';

    axios.post(addNewQuoteUrl, newQuoteState).then(() => {
        updateBooks(setState, type);

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
    document.getElementById('addQuoteField').value = '';
}

function addNewCritique(newCritiqueState, setState, setAddCritiqueActive, setNotificationActive, setNotificationMessage, type) {
    const addNewCritiqueUrl = 'http://5.101.50.241:8080/critique/add';

    axios.post(addNewCritiqueUrl, newCritiqueState).then(() => {
        updateBooks(setState, type);

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
    document.getElementById('addCritiqueField').value = '';
}

function changeState(flag, option, bookId, setState, setNotificationActive, setNotificationMessage, type, rating) {
    const changeStateUrl = 'http://5.101.50.241:8080/state/change';

    axios.post(changeStateUrl, {flag, option, bookId, rating}).then(() => {
        updateBooks(setState, type);

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
                if (rating !== "0") {
                    notificationMessage = "Оценка книги изменена успешно";
                } else {
                    if (flag) {
                        notificationMessage = "Книга добавлена в прочитанное";
                    } else {
                        notificationMessage = "Книга удалена из прочитанного";
                    }
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
                if (rating !== "0") {
                    notificationMessage = "Не удалось изменить оценку книги";
                } else {
                    notificationMessage = "Не удалось добавить книгу в прочитанное";
                }
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
    let imageBlurBackgroundName = imageName + '_blur_background';

    let localforageValue;
    localforage.getItem(imageBackgroundName, function (err, value) {
        // console.log("Локал стораж: " + value !== null ? value.substr(0, 5) : "no");
        // console.log("WUT: " + value);
        if (value === null) {
            const downloadUrl = 'http://5.101.50.241:8080/file/download/' + imageName + '.png';

            axios.get(downloadUrl, {
                responseType: 'arraybuffer'
            }).then((result) => {
                localforage.setItem(imageBackgroundName, Buffer.from(result.data, 'binary').toString('base64'), function(err, value) {
                    console.log("Добавлено изображение в базу: " + imageName + ".png");
                });
                console.log("Скачано изображение: " + imageName + ".png")
            });
        }
    });

    localforage.getItem(imageBlurBackgroundName, function(err, value) {
        // console.log("Локал стораж1: " + value !== null ? value.substr(0, 5) : "no");
        if (value === null) {
            const downloadBlurUrl = 'http://5.101.50.241:8080/file/download/' + imageName + '_blur.png';

            axios.get(downloadBlurUrl, {
                responseType: 'arraybuffer'
            }).then((result) => {
                localforage.setItem(imageBlurBackgroundName, Buffer.from(result.data, 'binary').toString('base64'), function(err, value) {
                    console.log("Добавлено изображение в базу: " + imageName + "_blur.png");
                });
                console.log("Скачано размытое изображение: " + imageName + "_blur.png")
            });
        }
    });
}

function uploadImage(image, name) {
    const formData = new FormData();
    const blob = image.slice(0, image.size, 'image/png');
    formData.append("file", new File([blob], name, {type: 'image/png'}));

    const uploadImageUrl = 'http://5.101.50.241:8080/file/upload';

    axios.post(uploadImageUrl, formData).then(() => {
        console.log("Загружен файл " + name);
    });
}

function BookArea({type}) {
    const [state, setState] = useState({ books: [] });
    const [notificationActive, setNotificationActive] = useState(false);
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [addBookActive, setAddBookActive] = useState(false);
    const [removeBookActive, setRemoveBookActive] = useState(false);
    const [removeQuoteActive, setRemoveQuoteActive] = useState(false);
    const [removeCritiqueActive, setRemoveCritiqueActive] = useState(false);
    const [editCritiqueActive, setEditCritiqueActive] = useState(false);
    const [editQuoteActive, setEditQuoteActive] = useState(false);
    const [addQuoteActive, setAddQuoteActive] = useState(false);
    const [addCritiqueActive, setAddCritiqueActive] = useState(false);
    const [selectionBook, setSelectionBook] = useState({});
    const [currentBookId, setCurrentBookId] = useState("");
    const [currentQuoteId, setCurrentQuoteId] = useState("");
    const [currentCritiqueId, setCurrentCritiqueId] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        fetchRelevantBooksData(setState, type);
    }, [setState]);

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
                    <DetailedInfo setDescriptionActive={setDescriptionActive}
                                  removeQuoteActive={removeQuoteActive}
                                  setRemoveQuoteActive={setRemoveQuoteActive}
                                  selectionBook={selectionBook}
                                  setRemoveCritiqueActive={setRemoveCritiqueActive}
                                  setCurrentCritiqueId={setCurrentCritiqueId}
                                  setCurrentQuoteId={setCurrentQuoteId}
                                  setEditCritiqueActive={setEditCritiqueActive}
                                  setEditQuoteActive={setEditQuoteActive}/>
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
                             setNotificationMessage={setNotificationMessage}
                             type={type}/>
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
                                setNotificationMessage={setNotificationMessage}
                                type={type}/>
                </ActionForm>

                {/* Окно удаления цитаты */}
                <ActionForm active={removeQuoteActive}
                            setActive={setRemoveQuoteActive}
                            formType={"removeQuoteForm"}>
                    <RemoveQuote currentQuoteId={currentQuoteId}
                                 removeQuote={removeQuote}
                                 setState={setState}
                                 setRemoveQuoteActive={setRemoveQuoteActive}
                                 setNotificationActive={setNotificationActive}
                                 setNotificationMessage={setNotificationMessage}
                                 type={type}/>
                </ActionForm>

                {/* Окно удаления рецензии */}
                <ActionForm active={removeCritiqueActive}
                            setActive={setRemoveCritiqueActive}
                            formType={"removeCritiqueForm"}>
                    <RemoveCritique currentCritiqueId={currentCritiqueId}
                                 removeCritique={removeCritique}
                                 setState={setState}
                                 setRemoveCritiqueActive={setRemoveCritiqueActive}
                                 setNotificationActive={setNotificationActive}
                                 setNotificationMessage={setNotificationMessage}
                                 type={type}/>
                </ActionForm>

                {/* Окно редактирования рецензии */}
                <ActionForm active={editCritiqueActive}
                            setActive={setEditCritiqueActive}
                            formType={"editCritiqueForm"}>
                    <EditCritique currentCritiqueId={currentCritiqueId}
                                  editCritique={editCritique}
                                  setState={setState}
                                  setEditCritiqueActive={setEditCritiqueActive}
                                  setNotificationActive={setNotificationActive}
                                  setNotificationMessage={setNotificationMessage}
                                  selectionBook={selectionBook}
                                  type={type}/>
                </ActionForm>

                {/* Окно редактирования цитаты */}
                <ActionForm active={editQuoteActive}
                            setActive={setEditQuoteActive}
                            formType={"editQuoteForm"}>
                    <EditQuote currentQuoteId={currentQuoteId}
                               editQuote={editQuote}
                               setState={setState}
                               setEditQuoteActive={setEditQuoteActive}
                               setNotificationActive={setNotificationActive}
                               setNotificationMessage={setNotificationMessage}
                               selectionBook={selectionBook}
                               type={type}/>
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
                                 setNotificationMessage={setNotificationMessage}
                                 type={type}/>
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
                                    setNotificationMessage={setNotificationMessage}
                                    type={type}/>
                </ActionForm>

                <Sidebar type={type}
                         fetchRelevantBooksAmount={fetchRelevantBooksAmount}/>
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
                           setNotificationMessage={setNotificationMessage}
                           type={type}
                           setCurrentQuoteId={setCurrentQuoteId}
                           setRemoveQuoteActive={setRemoveQuoteActive}
                           setCurrentCritiqueId={setCurrentCritiqueId}
                           setEditCritiqueActive={setEditCritiqueActive}
                           setEditQuoteActive={setEditQuoteActive}
                           setRemoveCritiqueActive={setRemoveCritiqueActive}/>
            </FadeIn>
        </Suspense>
    );
}

export default BookArea;