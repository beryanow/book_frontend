import React from "react";
import InfoTitle from "./InfoTitle";
import InputField from "./InputField";
import InputFileField from "./InputFileField";

function AddBook({ addNewBook, uploadImage, setState, setAddBookActive, setNotificationActive, setNotificationMessage, type }) {
    return (
        <div className={"addBook"}>
            <InfoTitle className={"optionTitle"} name={'Новая книга'}/>
            <InfoTitle className={"bookField"} name={'Название'}/>
            <InputField id={"bookFieldName"}/>
            <InfoTitle className={"bookField"} name={'Автор'}/>
            <InputField id={"bookFieldAuthor"}/>
            <InfoTitle className={"bookField"} name={'Обложка'}/>
            <InputFileField id={"bookFieldImage"}/>
            <div className={"addBookButton transition"} onClick={() => {
                const name = document.getElementById('bookFieldName').value;
                const author = document.getElementById('bookFieldAuthor').value;
                const fileName = name + ".png";

                uploadImage(document.getElementById('bookFieldImage').files[0], fileName);
                addNewBook({name, author, fileName}, setState, setAddBookActive, setNotificationActive, setNotificationMessage, type);
            }
            }>Добавить книгу
            </div>
        </div>
    );
}

export default AddBook;