// 상위 컴포넌트: pages/manage.js


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

/* Components */
import { ManageBody, ManageHeader } from '../components/Manage'

/* Actions */
import {
    getMyPostRequest,               // Posts GET request 함수
    deletePostRequest,              // Post Delete Post request 함수  
    updatePostConditionRequest,
} from '../store/actions/manage'
import { getStatusRequest, logoutRequest } from '../store/actions/auth'

/* Constants */
import {
    MANAGE_PROFILE,
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_CONTACT,
} from '../constants/manage_category'
import {
    MARKET,
    NETWORKING,
} from '../constants/categories'


class ManageContainer extends Component {

    state = {}

    componentDidMount() {
        const {
            kind,
            getStatusRequest,
            getMyPostRequest
        } = this.props

        let board;

        getStatusRequest();

        switch(kind) {

            /* 계정 관리 */
            case MANAGE_PROFILE:
                break;

            /* 게시글 관리 */
            case MANAGE_POSTS_MARKET:
                board = MARKET;
                // eslint-disable-next-line
            case MANAGE_POSTS_NETWORKING:
                board = board ? MARKET : NETWORKING;

                // console.log(`posts/${board}`);
                getMyPostRequest(board);
                break;

            /* 댓글단 게시글 보기 */
            case MANAGE_COMMENTS:
                // console.log('comment category');
                break;

            /* 좋아요 표시한 게시글 */
            case MANAGE_LIKEPOSTS:
                // console.log('likeposts category');
                break;

            /* 내 카풀 일정 */
            case MANAGE_CONTACT:
                break;

            /* kind가 post인 경우 */
            default:
                break;
        }

        /* window size 변경 시, 변경된 사이즈를 state에 저장함 */
        window.addEventListener('resize', this._updateWindowSize)
        this._updateWindowSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowSize)
    }

    /* window 사이즈를 update */
    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }


    render() {

        const {
            isGetStatusDone,
            curUser,
            kind,

            isGetManageItemsDone,
            isManageItemsLoading,

            postList,

            logoutRequest,
            deletePostRequest,
            updatePostConditionRequest,
        } = this.props;
    
        const { windowHeight } = this.state;

        const isLoaded = isGetStatusDone && isGetManageItemsDone;

        return(
            <div>
            {
                isLoaded ?
                
                    curUser ? 
                    <div>
                        <ManageHeader
                            curUser={curUser}
                            logoutRequest={logoutRequest}
                        />
                        <ManageBody 
                            curUser={curUser}
                            kind={kind}
                            windowHeight={windowHeight}
                            isLoading={isManageItemsLoading}
                            postList={postList}

                            deletePost={deletePostRequest}
                            updatePostCondition={updatePostConditionRequest}
                        /> 
                    </div> :
                    <Redirect to='/' />:

                '로딩 중'
            }
            </div> 
        )
    }

}

ManageContainer.propTypes = {
    kind: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                                   // 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,                // get status 요청 완료 여부

        isGetManageItemsDone: state.manage.isGetManageItemsDone,    // Manage 페이지의 GET 요청 완료 여부
        isManageItemsLoading: state.manage.isManageItemsLoading,    // Manage 페이지에서 로딩중을 띄우는 지 여부

        postList: state.manage.postList,                            // Posts GET 요청을 통해 얻은 post list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},                         // 접속된 유저 정보를 요청하는 액션
        logoutRequest: () => dispatch(logoutRequest()),                                 // 로그아웃 액션

        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},               // 내가 작성한 전체 Post 데이터 GET request 함수
        deletePostRequest: (board, id) => {dispatch(deletePostRequest(board, id))},     // Post Delete POST request 함수
        updatePostConditionRequest: (board, id, condition) => {                         // 포스팅의 상태 변경 POST request 메서드
            dispatch(updatePostConditionRequest(board, id, condition))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);