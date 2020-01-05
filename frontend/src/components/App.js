// 실질적으로 보여지는 부분이 담긴 최상위 컴포넌트
// 페이지 절대 구성 요소인 Header와 SideBar를 먼저 구성하고, Main Template 내에 url에 따라 페이지 렌더

// 상위 컴포넌트: Root

import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import 'antd/dist/antd.css'

// 컴포넌트
import { 
    NotFound, 
    Auth,
    Manage,
} from "../pages";
import MainTemplate from "./MainTemplate";

import './App.css';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={ () => 
                <MainTemplate kind="Home" />
            } />
            <Route path='/board' component={ () => 
                <MainTemplate kind="Board" />
            } />
            <Route path='/carpool' component={ () => 
                <MainTemplate kind="Carpool" />
            } />
            <Route path='/auth/:kind' component={Auth} />
            <Route path='/manage' component={Manage} />
            <Route component={NotFound}/>
        </Switch>
    )
}

export default App;