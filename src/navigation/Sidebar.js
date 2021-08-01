import React from "react";
import "./styles/Sidebar.css"
import Selection from "./Selection";
import {Link} from "react-router-dom";

function Sidebar({type, fetchRelevantBooksAmount}) {
    return <div className={"sidebar"}>
        <img style={{marginTop: '-15px'}} src={"/logo.png"}/>
        <Link to={"/shelf"} >
            <Selection name={"Книжная полка"}
                       buttonImage={"/shelve.png"}
                       activeButtonImage={"/shelveActive.png"}
                       active={type === "shelf"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"shelf"}/>
        </Link>
        <Link to={"/favourite"}>
            <Selection name={"Избранное"}
                       buttonImage={"/favourite.png"}
                       activeButtonImage={"/favouriteActive.png"}
                       active={type === "favourite"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"favourite"}/>
        </Link>
        <Link to={"/read"}>
            <Selection name={"Прочитанное"}
                       buttonImage={"/read.png"}
                       activeButtonImage={"/readActive.png"}
                       active={type === "read"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"read"}/>
        </Link>
        <Link to={"/reading"}>
            <Selection name={"Текущее"}
                       buttonImage={"/timed.png"}
                       activeButtonImage={"/timedActive.png"}
                       active={type === "reading"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"reading"}/>
        </Link>
        <Link to={"/to-read"}>
            <Selection name={"Желанное"}
                       buttonImage={"/desires.png"}
                       activeButtonImage={"/desiresActive.png"}
                       active={type === "to-read"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"to-read"}/>
        </Link>
        <Link to={"/quote"}>
            <Selection name={"Цитаты"}
                       buttonImage={"/quote.png"}
                       activeButtonImage={"/quoteActive.png"}
                       active={type === "quote"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"quote"}/>
        </Link>
        <Link to={"/critique"}>
            <Selection name={"Рецензии"}
                       buttonImage={"/reviews.png"}
                       activeButtonImage={"/reviewsActive.png"}
                       active={type === "critique"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"critique"}/>
        </Link>
        <Link to={"/rating"}>
            <Selection name={"Оценки"}
                       buttonImage={"/assessment.png"}
                       activeButtonImage={"/assessmentActive.png"}
                       active={type === "rating"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"rating"}/>
        </Link>
        <Link to={"/author"}>
            <Selection name={"Авторы"}
                       buttonImage={"/authors.png"}
                       activeButtonImage={"/authorsActive.png"}
                       active={type === "author"}
                       fetchRelevantBooksAmount={fetchRelevantBooksAmount}
                       type={"author"}/>
        </Link>
    </div>;
}

export default Sidebar;