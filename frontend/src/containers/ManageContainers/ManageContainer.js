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
    getMyPostRequest    // Posts GET request 함수  
} from '../../store/actions/manage'

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

import {
    NO_USER,
} from '../../constants/error_types'



class ManageContainer extends Component {

    componentDidMount() {
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
                this.props.getMyPostRequest(board);
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

    }


    render() {

        const {
            // isGetSuccess,
            user,
            kind,
            err,

            postList
        } = this.props;
    
        
        /* 에러 처리 */
        /* 유저가 없는 경우, 로그인 페이지로 이동 */
        if (err === NO_USER) {
            return (
                <Redirect to='/auth/login' />
            )
        }


        return(
            <div>
                <Header 
                    isEdit={false} 
                    user={user}
                />
                <Body 
                    user={user}
                    kind={kind}

                    postList={postList}
                />
            </div>
        )
    }

}

ManageContainer.propTypes = {
    match: PropTypes.object.isRequired,     // url을 통해 주는 정보.
}

const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.manage.isGetSuccess,    // GET 요청의 성공 여부
        err: state.manage.err,                      // GET 실패 시 err 식별자

        user: state.manage.user,                     // 유저 정보

        postList: state.manage.postList,            // Posts GET 요청을 통해 얻은 post list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);