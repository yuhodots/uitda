// 상위 컴포넌트: App.js

/* /board url이 들어올 때, 처리하는 page 파일
   /board/market 은 market 게시판으로,
   /board/networking 은 networking 게시판으로,
   /board/market/:id 는 market 게시판의 게시글 상세 페이지로,
   /board/networking/:id 는 networking 게시판의 게시글 상세 페이지로,
   그 외의 경우는 NotFound를 render한다. */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BoardContainer from "../containers/BoardContainer";
import BoardDetailContainer from '../containers/BoardDetailContainer';
import NotFound from './NotFound';

const Board = (props) => {
    return (
        <div>
            <Switch>
                {/* 게시판으로 이동하는 url 경로 처리
                    '/board/market'과 '/board/networking'에 해당하는 
                    exact path 만이 게시판에 일치하게 해야 한다. */}
                <Route exact path='/board/market' component={ () => 
                    <BoardContainer {...props} boardName='market' />
                } />
                <Route exact path='/board/networking' component={ () => 
                    <BoardContainer {...props} boardName='networking' />
                } />

                {/* 포스팅 상세 페이지로 이동하는 url경로 처리
                    /board/market/:id와 /board/networking/:id에 해당되는 url만 처리하도록 하기 위해,
                    /board/ 이후가 market과 network인 path만이 PostDetailPath를 render하게 함. */}
                <Route path='/board/market/' render={() => PostDetailPath(props)} />
                <Route path='/board/networking/' render={() => PostDetailPath(props)} />

                {/* 이 외의 path는 404 NotFound를 띄운다. */}
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

/* 포스팅 상세 페이지에 boardName과 게시글 id 정보를 주기 위한 컴포넌트
   boardName과 id는 pretty URL 방법으로 넘겨줍니다.
   boardName을 url을 통해 받지만, PostDetailPath는 boardName이 market과 networking인 경우에만 render되기 때문에 걱정할 필요가 없다. */
const PostDetailPath = ({rootSocket}) => {
    return (
        <Route path='/board/:boardName/:id' component={(props) => <BoardDetailContainer {...props} rootSocket={rootSocket} /> } />
    )
}


export default Board;