// 상위 컴포넌트: pages/Board

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardDetail from "../components/BoardDetail";
import NotFound from '../components/NotFound';

import { 
    initiateDetailPage,
    getBoardDetailRequest,
    createComment,
} from '../store/actions/board';
import { headerOff } from "../store/actions/structure"
import { topicSelect } from "../store/actions/topic";

class BoardDetailContainer extends Component {

    componentDidMount () {

        // console.log('mount detail')
        // console.log(this.props);

        // const { boardName } = this.props;
        const { boardName, id } = this.props.match.params;

        this.props.headerOff();                              // 헤더 Off
        this.props.topicSelect(boardName);

        this.props.getBoardDetailRequest(boardName, id);
    }

    componentWillUnmount () {
        // console.log('unmount detail')
        this.props.initiateDetailPage()
    }


    render() {
        const { 
            isGetSuccess, 
            post,
            commentList,
            
            createComment,
        } = this.props;

        /* 게시판 정보 */
        const { boardName } = this.props.match.params;

        return (
            isGetSuccess ?
            <BoardDetail 
                board={boardName}
                post={post} 
                commentList={commentList} 

                createComment={createComment}
            /> :
            <NotFound /> // default는 loading 페이지, get요청이 실패한 경우에는 페이즐 찾을 수 없습니다. url링크를 확인해주세요.
        )
    }
}

BoardDetailContainer.propTypes = {
    match: PropTypes.object.isRequired,         // url을 통해 넘겨 받는 값. params.id 가 id 값이다.
}


const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.board.isGetSuccess,     // GET 요청이 성공했는 지 여부
        post: state.board.post,                     // 포스팅 데이터
        commentList: state.board.commentList,       // 포스팅 댓글 데이터
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        headerOff: () => {dispatch(headerOff())},                                       // 헤더를 사라지게 하는 메서드
        topicSelect: (boardName) => {                                                   // 토픽을 설정함
            dispatch(topicSelect(boardName))
        },            
        initiateDetailPage: () => {dispatch(initiateDetailPage())},                     // 디테일 페이지를 초기화 함   
        getBoardDetailRequest: (boardName, id) => {                                     // backend 서버에 GET 요청
            dispatch(getBoardDetailRequest(boardName, id))
        },
        createComment: (description, type_board, board_id, parent_comment) => {         // 댓글을 생성하는 메서드
            dispatch(createComment(description, type_board, board_id, parent_comment))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardDetailContainer);