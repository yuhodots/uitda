// 상위 컴포넌트: pages/manage.js


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

/* Components */
import {
    Header, Body,
} from '../../components/Manage/ManageStructure'

/* Actions */
import {
    getMyPostRequest,               // Posts GET request 함수
    deletePostRequest,              // Post Delete Post request 함수  
    updatePostConditionRequest,
} from '../../store/actions/manage'
import { getStatusRequest } from '../../store/actions/auth'

/* Constants */
import {
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_MYCARPOOL,
    MANAGE_NOTIFICATIONS,
} from '../../constants/manage_category'

import {
    MARKET,
    NETWORKING,
} from '../../constants/categories'


class ManageContainer extends Component {

    state = { isLoad: false }

    async componentDidMount() {
        try {
            const {
                kind
            } = this.props
    
            let board;

            switch(kind) {
    
                /* 게시글 관리 */
                case MANAGE_POSTS_MARKET:
                    board = MARKET;
                    // eslint-disable-next-line
                case MANAGE_POSTS_NETWORKING:
                    board = board ? MARKET : NETWORKING;
    
                    // console.log(`posts/${board}`);
                    await this.props.getMyPostRequest(board);
                    await this.props.getStatusRequest();
                    break;
    
                /* 댓글 관리 */
                case MANAGE_COMMENTS:
                    // console.log('comment category');
                    break;
    
                /* 좋아요 표시한 게시글 */
                case MANAGE_LIKEPOSTS:
                    // console.log('likeposts category');
                    break;
    
                /* 내 카풀 일정 */
                case MANAGE_MYCARPOOL:
                    // console.log('mycarpool category');
                    break;   
                    
                /* 지난 알림 보기 */
                case MANAGE_NOTIFICATIONS:
                    // console.log('notification category');
                    break;
                
                /* kind가 post인 경우 */
                default:
                    break;
            }

            /* window size 변경 시, 변경된 사이즈를 state에 저장함 */
            window.addEventListener('resize', this._updateWindowSize)

            this.setState({
                ...this.state,
                isLoad: true,
                windowHeight: window.innerHeight
            })
        }
        catch {
            this.setState({
                ...this.state,
                isLoad: false
            })
        }
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
            // isGetSuccess,
            user,
            kind,

            postList,

            deletePostRequest,
            updatePostConditionRequest,
        } = this.props;
    
        const { 
            isLoad,
            windowHeight
        } = this.state;

        return(
            <div>
            {
                isLoad ? 
                <div>
                    {
                        !user && <Redirect to='/auth/login' />
                    }
                    <Header 
                        isEdit={false} 
                        user={user}
                    />
                    <Body 
                        user={user}
                        kind={kind}
                        windowHeight={windowHeight}

                        postList={postList}
                        deletePost={deletePostRequest}
                        updatePostCondition={updatePostConditionRequest}
                    /> 
                </div>:
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
        isGetSuccess: state.manage.isGetSuccess,    // GET 요청의 성공 여부
        err: state.manage.err,                      // GET 실패 시 err 식별자

        user: state.auth.user,                      // 유저 정보

        postList: state.manage.postList,            // Posts GET 요청을 통해 얻은 post list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},                         // 접속된 유저 정보를 요청하는 액션

        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},               // 내가 작성한 전체 Post 데이터 GET request 함수
        deletePostRequest: (board, id) => {dispatch(deletePostRequest(board, id))},     // Post Delete POST request 함수
        updatePostConditionRequest: (board, id, condition) => {                         // 포스팅의 상태 변경 POST request 메서드
            dispatch(updatePostConditionRequest(board, id, condition))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);