import React from "react";
import "./styles/Sidebar.css"
import Selection from "./Selection";

function Sidebar() {
    return <div className={"sidebar"}>
        <img style={{marginTop: '-15px'}} src={"/logo.png"}/>
        <Selection name={"Книжная полка"} buttonImage={"/shelve.png"}/>
        <Selection name={"Желания"} buttonImage={"/desires.png"}/>
        <Selection name={"Избранное"} buttonImage={"/favourite.png"}/>
        <Selection name={"Прочитанное"} buttonImage={"/read.png"}/>
        <Selection name={"Отложенное"} buttonImage={"/timed.png"}/>
        <Selection name={"Цитаты"} buttonImage={"/quote.png"}/>
        <Selection name={"Оценки"} buttonImage={"/assessment.png"}/>
        <Selection name={"Рецензии"} buttonImage={"/reviews.png"}/>
        <Selection name={"Авторы"} buttonImage={"/authors.png"}/>
    </div>;
}

export default Sidebar;