// 실질적으로 보여지는 부분이 담긴 최상위 컴포넌트
// 페이지 절대 구성 요소인 Header와 SideBar를 먼저 구성하고, Main Template 내에 url에 따라 페이지 렌더

// 상위 컴포넌트: Root

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// 컴포넌트
import { 
    Home, 
    NotFound, 
    Auth,
    Board,
    Carpool,
} from "../pages";
import SideBarContainer from "../containers/SideBarContainer";
import HeaderContainer from '../containers/HeaderContainer';

import './App.css';

class App extends Component {

    render() {
        return (
            <div>
                <HeaderContainer />
                <div className="MainTemplate">
                    <SideBarContainer />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/auth/:kind' component={Auth}/>
                        <Route path='/board' component={Board} />
                        <Route path='/carpool' component={Carpool} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;