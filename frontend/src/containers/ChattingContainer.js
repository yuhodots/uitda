

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import SocketIo from 'socket.io-client';

import { getStatusRequest, logoutRequest } from "../store/actions/auth";
import ChattingHeader from "../components/Chatting/ChattingHeader";
import ChattingBody from "../components/Chatting/ChattingBody";

// const chattingSocket = SocketIo.connect('/chatting');

class ChattingContainer extends Component {

    componentDidMount() {
        const { getStatusRequest } = this.props;
        getStatusRequest();
    }

    render() {

        const { 
            isGetStatusDone,
            curUser, 
            isIndex,
        
            logoutRequest
        } = this.props;

        return(
            isGetStatusDone ?

                curUser ?

                <div style={{height: '100%', width: '100%'}}>
                    <ChattingHeader 
                        curUser={curUser}
                        logoutRequest={logoutRequest}
                    />
                    <ChattingBody isIndex={isIndex} />
                </div> :

                <Redirect to='/' /> :

            ''
        )
    }
}

ChattingContainer.propTypes = {
    isIndex: PropTypes.bool,        // index 페이지인지 아닌 지
}

ChattingContainer.defaultProps = {
    isIndex: false,
}


const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                               // 현재 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,            // get status 요청 완료 여부
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => dispatch(getStatusRequest()),           // 현재 유저 정보를 불러오는 request 액션
        logoutRequest: () => dispatch(logoutRequest()),                 // 로그아웃 GET request 액션
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChattingContainer);