import React from "react";
import "./styles/Sidebar.css"
import Selection from "./Selection";
import {Link} from "react-router-dom";

function Sidebar({type}) {
    return <div className={"sidebar"}>
        <img style={{marginTop: '-15px'}} src={"/logo.png"}/>
        <Link to={"/shelf"} >
            <Selection name={"Книжная полка"} buttonImage={"/shelve.png"} active={type === "shelf"}/>
        </Link>
        <Link to={"/favourite"}>
            <Selection name={"Избранное"} buttonImage={"/favourite.png"} active={type === "favourite"}/>
        </Link>
        <Link to={"/read"}>
            <Selection name={"Прочитанное"} buttonImage={"/read.png"} active={type === "read"}/>
        </Link>
        <Link to={"/reading"}>
            <Selection name={"Текущее"} buttonImage={"/timed.png"} active={type === "reading"}/>
        </Link>
        <Link to={"/to-read"}>
            <Selection name={"Желанное"} buttonImage={"/desires.png"} active={type === "to-read"}/>
        </Link>
        <Link to={"/quote"}>
            <Selection name={"Цитаты"} buttonImage={"/quote.png"} active={type === "quote"}/>
        </Link>
        <Link to={"/critique"}>
            <Selection name={"Рецензии"} buttonImage={"/reviews.png"} active={type === "critique"}/>
        </Link>
        <Link to={"/rating"}>
            <Selection name={"Оценки"} buttonImage={"/assessment.png"} active={type === "rating"}/>
        </Link>
        <Link to={"/author"}>
            <Selection name={"Авторы"} buttonImage={"/authors.png"} active={type === "author"}/>
        </Link>
    </div>;
}

export default Sidebar;