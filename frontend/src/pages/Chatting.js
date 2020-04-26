

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ChattingContainer from "../containers/ChattingContainer";


const Chatting = ({rootSocket}) => {

    return (
        <Switch>
            <Route exact path='/chatting' render={() => <Redirect to='/chatting/index' />} />
            
            {/* 채팅 인덱스 페이지 (아무 방에도 들어가 있지 않은 시작 페이지) */}
            <Route exact path='/chatting/index' render={() => {
                return <ChattingContainer isIndex={true} rootSocket={rootSocket} />
            }} />

            <Route path='/chatting/t/:userID' component={ props => {
                return <ChattingContainer {...props} rootSocket={rootSocket} /> 
            }} />

            {/* 그 외는 page notfound로 넘어가도록 */}
        </Switch>
    )
}


export default Chatting;