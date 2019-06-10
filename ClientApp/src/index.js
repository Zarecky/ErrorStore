import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import auth from "./API/auth";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

export const renderApp = (state, callback = () => {}) => {
    ReactDOM.render(
        <BrowserRouter basename={baseUrl}>
            <App {...state}/>
        </BrowserRouter>,
        rootElement,
        callback);
};

export function getDate(date) {
    return (new Date(date)).toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'})
}

export let state = {
    user: {
        authenticated: false,
        name: null,
        surname: null
    }
};

auth.isLoged(data => {
    if (!data) {
        state = {
            user: {
                authenticated: false
            }
        };
        return renderApp(state);
    }

    console.log(data);

    state = Object.assign({}, state, {
        user: {
            authenticated: true,
            name: data.name,
            surname: data.surname
        }
    });
    renderApp(state);
});

auth.onLogin( data => {
    if (!data) {
        state = {
            user: {
                authenticated: false
            }
        };
        return renderApp(state);
    }
    
    console.log(data);
    
    state = Object.assign({}, state, {
        user: {
            authenticated: true,
            name: data.name,
            surname: data.surname
        }
    });
    renderApp(state);
});

auth.onInvalidLogin(err => {
    console.log(err);
});

auth.onLogout(() => {
    state = Object.assign({}, state, {
        user: {
            authenticated: false,
            name: null,
            surname: null
        }
    });
    renderApp(state);
});

registerServiceWorker();
