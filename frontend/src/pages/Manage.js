// 상위 컴포넌트: index.js, App.js

/* '/manage'로 시작하는 url을 처리하는 path Component
   
 */

import React from 'react';
import { 
    Route,
    Switch, 
    Redirect
} from 'react-router-dom';

import NotFound from './NotFound';
import ManageContainer from '../containers/ManageContainers/ManageContainer';
import EditContainer from "../containers/ManageContainers/EditContainer";

import {
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_MYCARPOOL,
    MANAGE_NOTIFICATIONS,

    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
} from '../constants/manage_category';

const Manage = () => {
    return (
        <Switch>
            {/* manage의 default는 market 포스팅 관리 페이지 */}
            <Route exact path='/manage' render={() => 
                <Redirect to='/manage/posts/market' />
            } />

            {/*  */}
            <Route exact path='/manage/edit/newpost' render={() => 
                <EditContainer isNew={true} />
            } />
            <Route path='/manage/edit/:boardName/:id' component={EditContainer} />

            {/* 카테고리 별 해당 kind를 넘겨주기 */}
            <Route path={`/manage/posts/market`} component={() => 
                <ManageContainer kind={MANAGE_POSTS_MARKET} />
            } />
            <Route path={`/manage/posts/networking`} component={() => 
                <ManageContainer kind={MANAGE_POSTS_NETWORKING} />
            } />
            <Route path={`/manage/${MANAGE_COMMENTS}`} component={() => 
                <ManageContainer kind={MANAGE_COMMENTS} />
            } />
            <Route path={`/manage/${MANAGE_LIKEPOSTS}`} component={() => 
                <ManageContainer kind={MANAGE_LIKEPOSTS} />
            } />
            <Route path={`/manage/${MANAGE_MYCARPOOL}`} component={() => 
                <ManageContainer kind={MANAGE_MYCARPOOL} />
            } />
            <Route path={`/manage/${MANAGE_NOTIFICATIONS}`} component={() => 
                <ManageContainer kind={MANAGE_NOTIFICATIONS} />
            } />

            {/* 그 외는 404 NotFound를 render한다. */}
            <Route component={NotFound} />
        </Switch>
    )
}

export default Manage;