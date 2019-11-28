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
            <Route path='/manage/comments' component={ManagePathWithParams} />
            <Route path='/manage/likeposts' component={ManagePathWithParams} />
            <Route path='/manage/mycarpool' component={ManagePathWithParams} />
            <Route path='/manage/notifications' component={ManagePathWithParams} />

            {/* 그 외는 404 NotFound를 render한다. */}
            <Route component={NotFound} />
        </Switch>
    )
}

const ManagePathWithParams = () => <Route path='/manage/:kind' component={ManageContainer} />


export default Manage;