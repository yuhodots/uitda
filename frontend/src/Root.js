import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducer from './store/reducers';

const store = createStore(reducer, applyMiddleware(thunk));

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