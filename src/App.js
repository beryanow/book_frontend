import React from "react";
import BookArea from "./book/BookArea";

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import localforage from "localforage";

function App({history}) {
    const ShelveWrapped = function (props) {
        return (
            <BookArea {...props} type={"shelf"}/>
        );
    };

    const ReadWrapped = function (props) {
        return (
            <BookArea {...props} type={"read"}/>
        );
    };

    const ReadingWrapped = function (props) {
        return (
            <BookArea {...props} type={"reading"}/>
        );
    };

    const ToReadWrapped = function (props) {
        return (
            <BookArea {...props} type={"to-read"}/>
        );
    };

    const FavouriteWrapped = function (props) {
        return (
            <BookArea {...props} type={"favourite"}/>
        );
    };

    const QuoteWrapped = function (props) {
        return (
            <BookArea {...props} type={"quote"}/>
        );
    };

    const RatingWrapped = function (props) {
        return (
            <BookArea {...props} type={"rating"}/>
        );
    };

    const CritiqueWrapped = function (props) {
        return (
            <BookArea {...props} type={"critique"}/>
        );
    };

    const AuthorWrapped = function (props) {
        return (
            <BookArea {...props} type={"author"}/>
        );
    };

    return (
        <Switch>
            <Route history={history} path='/shelf' component={ShelveWrapped}/>
            <Route history={history} path='/read' component={ReadWrapped}/>
            <Route history={history} path='/reading' component={ReadingWrapped}/>
            <Route history={history} path='/to-read' component={ToReadWrapped}/>
            <Route history={history} path='/favourite' component={FavouriteWrapped}/>
            <Route history={history} path='/quote' component={QuoteWrapped}/>
            <Route history={history} path='/rating' component={RatingWrapped}/>
            <Route history={history} path='/critique' component={CritiqueWrapped}/>
            <Route history={history} path='/author' component={AuthorWrapped}/>
            <Redirect from='/' to='/shelf'/>
        </Switch>
    );
}

export default withRouter(App);
