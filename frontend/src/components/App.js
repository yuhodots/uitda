// 실질적으로 보여지는 부분이 담긴 최상위 컴포넌트
// 페이지 절대 구성 요소인 Header와 SideBar를 먼저 구성하고, Main Template 내에 url에 따라 페이지 렌더

// 상위 컴포넌트: Root

import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import socketio from 'socket.io-client';
import 'antd/dist/antd.css'

// 컴포넌트
import { 
    Home,
    Board,
    Carpool,
    NotFound, 
    Manage,
    Chatting,
} from "../pages";
import LocalLoginPage from "./Home/LocalLoginPage";

import './App.css';

// const rootSocket = socketio.connect('/');

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/board' component={ () => <Board /* rootSocket={rootSocket} */ /> } />
            <Route path='/carpool' component={ () => <Carpool /* rootSocket={rootSocket} */ /> } />
            <Route path='/manage' component={ () => <Manage /* rootSocket={rootSocket} */ /> } />
            <Route path='/chatting' component={ () => <Chatting /* rootSocket={rootSocket} */ /> } />
            <Route path='/local-login' component={ LocalLoginPage } />
            <Route component={NotFound}/>
        </Switch>
    )
}

export default App;