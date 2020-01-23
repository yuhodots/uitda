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
    getMyPostRequest,   // Posts GET request 함수
    deletePostRequest,  // Post Delete Post request 함수  
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
} from '../../constants/board_name'


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

            this.setState({
                ...this.state,
                isLoad: true
            })
        }
        catch {
            this.setState({
                ...this.state,
                isLoad: false
            })
        }
    }


    render() {

        const {
            // isGetSuccess,
            user,
            kind,

            postList,

            deletePostRequest,
        } = this.props;
    
        const { isLoad } = this.state;

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

                        postList={postList}
                        deletePost={deletePostRequest}
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

        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},
        deletePostRequest: (board, id) => {dispatch(deletePostRequest(board, id))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);