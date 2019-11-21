// 헤더와 헤더와 관련된 상태를 담은 컴포넌트
// isHeaderOn, isSearchBarOn, isCategoryOn, isLoggedIn, whichBoard
// getStatus => ( 한 군데서 처리해도 되지 않을까 ? ), handleLogout 

// 상위 컴포넌트: App

import React, { Component } from "react";
import { connect } from 'react-redux';

/* 액션들 */
import { 
    getStatusRequest,
    logoutRequest 
} from "../store/actions/auth";
import { getBoardRequest } from "../store/actions/board";

import Header from "../components/Structure/Header";

class HeaderContainer extends Component {    
    
    componentDidMount() {
        this.props.getStatusRequest();
    }
    
    render() {
        const {
            isHeaderOn,
            isSearchBarOn,
            isCategoryOn,
            isLoggedIn,
            userInfo,
            topic,

            logoutRequest,
            getStatusRequest,
            getBoardRequest
        } = this.props;

        return (
            <Header 
                isHeaderOn={isHeaderOn}
                isSearchBarOn={isSearchBarOn}
                isCategoryOn={isCategoryOn}
                isLoggedIn={isLoggedIn}
                user={userInfo}
                topic={topic}
                
                handleLogout={logoutRequest}
                getStatus={getStatusRequest}
                getBoardRequest={getBoardRequest}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isHeaderOn: state.structure.isHeaderOn,         // Header가 나타나는 지,
        isSearchBarOn: state.structure.isSearchBarOn,   // 검색바를 나타낼지,
        isCategoryOn: state.structure.isCategoryOn,     // 카테고리 창을 나타낼지,
        isLoggedIn: state.auth.isLoggedIn,              // 로그인 되어있는지,
        userInfo: state.auth.userInfo,                  // 유저 정보 객체
        topic: state.topic.topic,                       // 현재 무슨 topic인지
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},
        logoutRequest: () => {dispatch(logoutRequest())},
        getBoardRequest: (boardName, scroll, search) => {           // 검색 시, get request를 보냄
            dispatch(getBoardRequest(boardName, scroll, search))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);