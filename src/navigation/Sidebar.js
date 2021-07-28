import React from "react";
import "./styles/Sidebar.css"
import Selection from "./Selection";
import {Link} from "react-router-dom";

function Sidebar() {
    return <div className={"sidebar"}>
        <img style={{marginTop: '-15px'}} src={"/logo.png"}/>
        <Link to={"/shelf"}>
            <Selection name={"Книжная полка"} buttonImage={"/shelve.png"}/>
        </Link>
        <Link to={"/favourite"}>
            <Selection name={"Избранное"} buttonImage={"/favourite.png"}/>
        </Link>
        <Link to={"/read"}>
            <Selection name={"Прочитанное"} buttonImage={"/read.png"}/>
        </Link>
        <Link to={"/reading"}>
            <Selection name={"Текущее"} buttonImage={"/timed.png"}/>
        </Link>
        <Link to={"/to-read"}>
            <Selection name={"Желанное"} buttonImage={"/desires.png"}/>
        </Link>
        <Link to={"/quote"}>
            <Selection name={"Цитаты"} buttonImage={"/quote.png"}/>
        </Link>
        <Link to={"/rating"}>
            <Selection name={"Оценки"} buttonImage={"/assessment.png"}/>
        </Link>
        <Link to={"/critique"}>
            <Selection name={"Рецензии"} buttonImage={"/reviews.png"}/>
        </Link>
        <Link to={"/author"}>
            <Selection name={"Авторы"} buttonImage={"/authors.png"}/>
        </Link>
    </div>;
}

export default Sidebar;