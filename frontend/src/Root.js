import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducer from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LastLocationProvider>
                    <App/>
                </LastLocationProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default Root;