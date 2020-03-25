

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ChattingContainer from "../containers/ChattingContainer";


const Chatting = () => {

    return (
        <Switch>
            {/* 채팅 인덱스 페이지 (아무 방에도 들어가 있지 않은 시작 페이지) */}
            <Route exact path='/chatting/index' render={() => {
                return <ChattingContainer isIndex={true} />
            }} />

            {/* 
                id를 room_id로 할지, user_id로 할지 고민
            */}
            <Route path='/chatting/:id' component={ChattingContainer} />
        </Switch>
    )
}


export default Chatting;