// 상위 컴포넌트: pages/Board

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardDetail from "../components/BoardDetail";
import ExceptionalPage from '../components/Exceptionals';

import { getStatusRequest } from '../store/actions/auth'
import { 
    initiateDetailPage,
    getBoardDetailRequest,
    createComment,
    updateComment,
    deleteComment,
} from '../store/actions/board';
import { headerOff } from "../store/actions/structure"
import { topicSelect } from "../store/actions/topic";

class BoardDetailContainer extends Component {

    componentDidMount () {

        console.log('detail did mount')

        const {
            match,

            headerOff,
            topicSelect,
            initiateDetailPage,
            getStatusRequest,
            getBoardDetailRequest,
        } = this.props
        
        const { 
            boardName, id 
        } = match.params;

        initiateDetailPage();

        headerOff();                             // 헤더 Off
        topicSelect(boardName);

        getStatusRequest();                      // 유저 정보 request
        getBoardDetailRequest(boardName, id);    // 포스팅 데이터 request
    }

    componentWillUnmount() {
        console.log('detail page unmount')
    }


    render() {
        const { 
            user,

            isLoaded, 
            post,
            commentList,
            
            createComment,
            updateComment,
            deleteComment,
        } = this.props;

        /* 게시판 정보 */
        const { boardName } = this.props.match.params;

        return isLoaded ?
            <BoardDetail 
                curUser={user}

                board={boardName}
                post={post} 
                commentList={commentList} 

                createComment={createComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
            /> :
            <ExceptionalPage /> // 로딩 중 + id가 올바르지 않은 경우
    }
}

BoardDetailContainer.propTypes = {
    match: PropTypes.object.isRequired,         // url을 통해 넘겨 받는 값. params.id 가 id 값이다.
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,                          // 유저 정보

        isLoaded: state.board.isDetailGetSuccess,       // GET 요청이 성공했는 지 여부
        post: state.board.post,                         // 포스팅 데이터
        commentList: state.board.commentList,           // 포스팅 댓글 데이터
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        headerOff: () => {dispatch(headerOff())},                                       // 헤더를 사라지게 하는 메서드
        topicSelect: (boardName) => {                                                   // 토픽을 설정함
            dispatch(topicSelect(boardName))
        },    
        
        getStatusRequest: () => {dispatch(getStatusRequest())},                         // 유저 정보를 요청하는 request 액션

        initiateDetailPage: () => {dispatch(initiateDetailPage())},                     // 디테일 페이지를 초기화 함   
        getBoardDetailRequest: (boardName, id) => {                                     // backend 서버에 GET 요청
            dispatch(getBoardDetailRequest(boardName, id))
        },
        createComment: (description, type_board, board_id, parent_comment) => {         // 댓글을 생성하는 메서드
            dispatch(createComment(description, type_board, board_id, parent_comment))
        },
        updateComment: (comment_id, description) => {                                   // 댓글 수정 액션
            dispatch(updateComment(comment_id, description))
        },
        deleteComment: (comment_id) => {dispatch(deleteComment(comment_id))},           // 댓글 삭제 메서드
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardDetailContainer);