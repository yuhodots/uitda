// 상위 컴포넌트: pages/Board

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardDetail from "../components/BoardDetail";
import NotFound from '../components/NotFound';

import { getBoardDetailRequest } from '../store/actions/board';
import { headerOff } from "../store/actions/structure"
import { topicSelect } from "../store/actions/topic";

class BoardDetailContainer extends Component {

    componentDidMount () {

        console.log(this.props);

        // const { boardName } = this.props;
        const { boardName, id } = this.props.match.params;

        this.props.headerOff();                              // 헤더 Off
        this.props.topicSelect(boardName);

        this.props.getBoardDetailRequest(boardName, id);
    }


    render() {
        const { isGetSuccess, post } = this.props;

        return (
            isGetSuccess ?
            <BoardDetail post={post} /> :
            <NotFound />
        )
    }
}

BoardDetailContainer.propTypes = {
    match: PropTypes.object.isRequired,         // url을 통해 넘겨 받는 값. params.id 가 id 값이다.
}


const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.board.isGetSuccess,                     // GET 요청이 성공했는 지 여부
        post: state.board.post,                                     // 포스팅 데이터
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        headerOff: () => {dispatch(headerOff())},                   // 헤더를 사라지게 하는 메서드
        topicSelect: (boardName) => {                               // 토픽을 설정함
            dispatch(topicSelect(boardName))
        },              
        getBoardDetailRequest: (boardName, id) => {                 // backend 서버에 GET 요청
            dispatch(getBoardDetailRequest(boardName, id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardDetailContainer);