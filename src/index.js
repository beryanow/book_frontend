import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from "react-router-dom"
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <App history={history}/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
