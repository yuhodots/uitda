// 홈 화면에 대한 액션이 담긴 컨테이너

// 상위 컴포넌트: pages/Home

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';  

import { getStatusRequest } from "../store/actions/auth";
import EnterPage from "../components/Home";

class HomeContainer extends Component {    

    state = {}

    componentDidMount() {
        const { getStatusRequest } = this.props;

        getStatusRequest();

        this.setState({
            ...this.state,
            isLoaded: true,
        })
    }

    render() {

        const { isLoaded } = this.state;

        const { curUser } = this.props;

        return isLoaded ?
            <div>
            {
                curUser ?
                <Redirect to='/board/market' /> :
                <EnterPage />
            }
            </div> :
            'loading'
    }
}

const mapStateToProps = (state) => {
    return { 
        curUser: state.auth.user,           // 현재 로그인 된 유저 정보
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => dispatch(getStatusRequest()),       // 현재 로그인 된 유저 정보 요청 액션    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);