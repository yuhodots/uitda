// '/board' url이 들어올 때, 처리하는 page 파일
// '/board' url은 market과 networking 게시판으로 이어진다.

// 상위 컴포넌트: App.js

import React from 'react';
import { Route } from 'react-router-dom';

import BoardContainer from "../containers/BoardContainer";
import MarketDetailContainer from '../containers/MarketDetailContainer';

const Board = () => {

    return (
        <div>
            <Route exact path='/board/market' render={ () => 
                <BoardContainer boardName='market' />
            } />
            <Route path='/board/market/:id' component={MarketDetailContainer} />

            <Route exact path='/board/networking' render={ () => 
                <BoardContainer boardName='networking' />
            } />
            <Route path='/board/networking/:id' component={MarketDetailContainer} />
        </div>
    )
}

export default Board;