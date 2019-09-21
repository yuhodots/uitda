// 헤더와 헤더와 관련된 상태를 담은 컴포넌트
// isHeaderOn, isSearchBarOn, isCategoryOn, isLoggedIn, whichBoard
// getStatus => ( 한 군데서 처리해도 되지 않을까 ? ), handleLogout 

// 상위 컴포넌트: App

import React, { Component } from "react";
import { connect } from 'react-redux';

import { 
    getStatusRequest,
    logoutRequest 
} from "../store/actions/auth";
import Header from "../components/Structure/Header";

class HeaderContainer extends Component {    
    
    componentDidMount() {
        this.props.getStatusRequest();
    }
    
    render() {
        return (
            <Header 
                isHeaderOn={this.props.isHeaderOn}
                isSearchBarOn={this.props.isSearchBarOn}
                isCategoryOn={this.props.isCategoryOn}
                isLoggedIn={this.props.isLoggedIn}
                user={this.props.userInfo}
                
                handleLogout={this.props.logoutRequest}
                getStatus={this.props.getStatusRequest}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},
        logoutRequest: () => {dispatch(logoutRequest())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);