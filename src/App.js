import React from "react";
import Shelf from "./book/Shelf";

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"

function App({history}) {
    const ShelveWrapped = function (props) {
        return (
            <Shelf {...props} type={"shelf"}/>
        );
    };

    const ReadWrapped = function (props) {
        return (
            <Shelf {...props} type={"read"}/>
        );
    };

    const ReadingWrapped = function (props) {
        return (
            <Shelf {...props} type={"reading"}/>
        );
    };

    const ToReadWrapped = function (props) {
        return (
            <Shelf {...props} type={"to-read"}/>
        );
    };

    const FavouriteWrapped = function (props) {
        return (
            <Shelf {...props} type={"favourite"}/>
        );
    };

    return (
        <Switch>
            <Route history={history} path='/shelf' component={ShelveWrapped}/>
            <Route history={history} path='/read' component={ReadWrapped}/>
            <Route history={history} path='/reading' component={ReadingWrapped}/>
            <Route history={history} path='/to-read' component={ToReadWrapped}/>
            <Route history={history} path='/favourite' component={FavouriteWrapped}/>
            <Redirect from='/' to='/shelf'/>
        </Switch>
    );
}

export default withRouter(App);
