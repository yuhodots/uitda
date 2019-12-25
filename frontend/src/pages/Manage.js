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


/* Kinds */
export const POSTS = 'posts'
export const MARKET = 'market'
export const NETWORKING = 'networking'
export const COMMENTS = 'comments'
export const LIKEPOSTS = 'likeposts'
export const MYCARPOOL = 'mycarpool'
export const NOTIFICATIONS = 'notifications'


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

            {/*  */}
            <Route path='/manage/posts/:board' component={ManageContainer} />

            {/*  */}
            <Route path={`/manage/${COMMENTS}`} component={ManagePathWithParams} />
            <Route path={`/manage/${LIKEPOSTS}`} component={ManagePathWithParams} />
            <Route path={`/manage/${MYCARPOOL}`} component={ManagePathWithParams} />
            <Route path={`/manage/${NOTIFICATIONS}`} component={ManagePathWithParams} />

            {/* 그 외는 404 NotFound를 render한다. */}
            <Route component={NotFound} />
        </Switch>
    )
}

const ManagePathWithParams = () => <Route path='/manage/:kind' component={ManageContainer} />


export default Manage;