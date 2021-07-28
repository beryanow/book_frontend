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

    const ToReadWrapped = function (props) {
        return (
            <Shelf {...props} type={"to-read"}/>
        );
    };

    return (
        <Switch>
            <Route history={history} path='/shelf' component={ShelveWrapped}/>
            <Route history={history} path='/to-read' component={ToReadWrapped}/>
            <Redirect from='/' to='/shelf'/>
        </Switch>
    );
}

export default withRouter(App);
