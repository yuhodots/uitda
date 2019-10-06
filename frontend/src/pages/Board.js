// '/board' url이 들어올 때, 처리하는 page 파일
// '/board' url은 market과 networking 게시판으로 이어진다.

// 상위 컴포넌트: App.js

import React from 'react';
import { Route } from 'react-router-dom';

import BoardContainer from "../containers/BoardContainer";
import BoardDetailContainer from '../containers/BoardDetailContainer';

const Board = () => {
    return (
        <div>
            
            <Route exact path='/board/market' render={ () => 
                <BoardContainer boardName='market' />
            } />

            <Route exact path='/board/networking' render={ () => 
                <BoardContainer boardName='networking' />
            } />

            <Route path='/board/:boardName/:id' component={BoardDetailContainer} />
            
        </div>
    )
}

export default Board;