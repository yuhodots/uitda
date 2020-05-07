// 상위 컴포넌트: pages/Board

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SocketIo from 'socket.io-client';

import SideBar from "../components/Structure/SideBar";
import BoardDetail from "../components/BoardDetail";
import ExceptionalPage from '../components/Exceptionals';

import { getStatusRequest } from '../store/actions/auth'
import { 
    initiateDetailPage,
    getBoardDetailRequest,
    socketOnCreateComment,
    socketOnUpdateComment,
    socketOnDeleteComment,
} from '../store/actions/board';
import { topicSelect } from "../store/actions/topic";
import { deletePostRequest } from "../store/actions/manage";

class BoardDetailContainer extends Component {

    boardSocket = SocketIo.connect('/board');

    componentDidMount () {
        const {
            match,

            topicSelect,
            initiateDetailPage,
            getStatusRequest,
            getBoardDetailRequest,
            socketOnCreateComment,
            socketOnUpdateComment,
            socketOnDeleteComment,
        } = this.props

        const { boardName, id } = match.params;

        initiateDetailPage();
        topicSelect(boardName);

        getStatusRequest();                      // 유저 정보 request
        getBoardDetailRequest(boardName, id);    // 포스팅 데이터 request


        this.boardSocket.emit('room in', {type_board: boardName, posting_id: id})

        this.boardSocket.on('comment create', ({user, comment}) => {
            socketOnCreateComment(user, comment);
        })
        this.boardSocket.on('comment update', ({comment_id, description, updated}) => {
            socketOnUpdateComment(comment_id, description, updated);
        })
        this.boardSocket.on('comment delete', ({comment_id}) => {
            socketOnDeleteComment(comment_id);
        })
    }

    componentWillUnmount() {
        const { match } = this.props;
        const { boardName, id } = match.params;
        this.boardSocket.emit('room out', {type_board: boardName, posting_id: id})
    }

    render() {
        const { 
            curUser,
            isGetStatusDone,

            isDetailGetSuccess, 
            post,
            commentList,
            
            deletePost,
        } = this.props;

        /* 게시판 정보 */
        const { boardName } = this.props.match.params;

        const isLoaded = isGetStatusDone && isDetailGetSuccess;

        return isLoaded ?
            curUser ?
                <div>
                    <SideBar topic={boardName} />

                    <BoardDetail 
                        boardSocket={this.boardSocket}
                        curUser={curUser}

                        board={boardName}
                        post={post} 
                        commentList={commentList} 

                        deletePost={deletePost}
                    />
                </div> :
                <Redirect to='/' /> :
            <ExceptionalPage /> // 로딩 중 + id가 올바르지 않은 경우
    }
}

BoardDetailContainer.propTypes = {
    match: PropTypes.object.isRequired,         // url을 통해 넘겨 받는 값. params.id 가 id 값이다.
}


const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                                  // 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,            // get status 요청 완료 여부

        isDetailGetSuccess: state.board.isDetailGetSuccess,     // GET 요청이 성공했는 지 여부
        post: state.board.post,                                 // 포스팅 데이터
        commentList: state.board.commentList,                   // 포스팅 댓글 데이터
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        topicSelect: (boardName) => {                                                   // 토픽을 설정함
            dispatch(topicSelect(boardName))
        },    
        
        getStatusRequest: () => {dispatch(getStatusRequest())},                         // 유저 정보를 요청하는 request 액션

        initiateDetailPage: () => {dispatch(initiateDetailPage())},                     // 디테일 페이지를 초기화 함   
        getBoardDetailRequest: (boardName, id) => {                                     // backend 서버에 GET 요청
            dispatch(getBoardDetailRequest(boardName, id))
        },
        deletePost: (board, id) => dispatch(deletePostRequest(board, id)),              // 게시글을 삭제하는 메서드

        socketOnCreateComment: (user, comment) => {                                     // comment create socket on 메서드
            dispatch(socketOnCreateComment(user, comment))
        },
        socketOnUpdateComment: (comment_id, description, updated) => {                  // 댓글 수정 액션
            dispatch(socketOnUpdateComment(comment_id, description, updated))
        },
        socketOnDeleteComment: (comment_id) => {                                        // comment delete socket on 메서드
            dispatch(socketOnDeleteComment(comment_id))
        },           
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardDetailContainer);